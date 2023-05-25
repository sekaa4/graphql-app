import SendIcon from '@mui/icons-material/Send';
import { Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/app/components/FireBase';
import { Editor } from '@/features/Editor';
import { getSearchBarInput, SearchBar, searchBarActions } from '@/features/SearchBar';
import { documentationActions } from '@/features/SideBar';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
import { DocumentSchemaLazy } from '@/features/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/main/main.module.css';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { Sidebar } from '@/widgets/layouts/side-bar';

type motionState = {
  activeVertical?: boolean;
  activeHorizontal?: boolean;
  deltaLeft?: null | number;
  deltaTop?: null | number;
  delta?: null | number;
  width?: null | number;
  height?: null | number;
};

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, ,] = useAuthState(auth);
  const [isOpen, setStatusOpen] = useState<boolean>(false);
  const [isDisabled, setDisabledButton] = useState<boolean>(true);
  const [motion, setMotion] = useState<motionState>({
    activeVertical: false,
    activeHorizontal: false,
    deltaLeft: null,
    deltaTop: null,
    delta: null,
    width: null,
    height: null,
  });
  // const [width, setWidth] = useState<number | null>(null);
  const curSearchBarInput = useAppSelector(getSearchBarInput);
  const { t } = useTranslation('common');

  const [getSchemaByAPI, { data: currentSchema, error: errorAPI, isLoading, isError }] =
    fetchSchemaByAPI();

  useEffect(() => {
    setDisabledButton(true);
    setStatusOpen(false);
    dispatch(documentationActions.setupInitialState());
    dispatch(searchBarActions.changeStatusSearchBarInput(false));
    curSearchBarInput && getSchemaByAPI(curSearchBarInput);
  }, [curSearchBarInput, dispatch, getSchemaByAPI]);

  useEffect(() => {
    if (!user) router.push('/');
  }, [router, user]);

  useEffect(() => {
    if (currentSchema && !isLoading) {
      setDisabledButton(false);
      dispatch(searchBarActions.changeStatusSearchBarInput(true));
    }
  }, [currentSchema, dispatch, isLoading]);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      let params: Partial<motionState> = {};
      if (motion.activeVertical) {
        const { deltaLeft, delta } = motion;
        const { clientX } = e;
        params.width = clientX - (deltaLeft || 0) - (delta || 0);
      } else if (motion.activeHorizontal) {
        const { deltaTop, delta } = motion;
        const { clientY } = e;
        params.height = clientY - (deltaTop || 0) - (delta || 0);
      }
      setMotion((motion) => ({ ...motion, ...params }));
    },
    [motion]
  );
  const mouseUp = useCallback(() => {
    setMotion((motion) => ({
      ...motion,
      activeVertical: false,
      activeHorizontal: false,
    }));
  }, []);

  const mouseDown = useCallback((e: React.MouseEvent) => {
    const el = e.target as HTMLDivElement;
    const dataResize = el.dataset?.resize;
    const parent = el.closest(`[data-id=${dataResize}]`);
    const coords: DOMRect | undefined = parent?.getBoundingClientRect();
    let params: Partial<motionState> = {};

    if (dataResize === 'resize-vertical') {
      const { width, left } = coords ?? {};
      const delta: number = e.clientX - (width || 0) - (left || 0);
      params = { activeVertical: true, width, deltaLeft: left, delta };
    }
    if (dataResize === 'resize-horizontal') {
      const { height, top } = coords ?? {};
      const delta: number = e.clientY - (height || 0) - (top || 0);
      params = { activeHorizontal: true, height, deltaTop: top, delta };
    }
    setMotion((motion: motionState) => ({ ...motion, ...params }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [mouseDown, mouseUp, mouseMove]);

  const handleDocClick = () => {
    currentSchema && setStatusOpen(!isOpen);
  };

  if (!user) {
    return <></>;
  } else {
    return (
      <>
        <Sidebar disabled={isDisabled} handleDocClick={handleDocClick} />
        {isOpen && <Divider sx={{ height: '100%', m: 0.5 }} orientation="vertical" />}
        <div>
          {isOpen && (
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <DocumentSchemaLazy schema={currentSchema} />
              </Suspense>
            </>
          )}
          {!isLoading && errorAPI && (
            <>
              <div>{t('invalidSchema')}</div>
              {/* <div>{JSON.stringify(errorAPI, null, '\t')}</div> */}
            </>
          )}
        </div>
        <div className={homeStyles.wrapper}>
          <SearchBar isError={isError} isLoading={isLoading} />
          <div className={homeStyles['editor-wrapper']}>
            <div
              className={homeStyles.left}
              style={{ width: motion?.width + 'px' }}
              data-id="resize-vertical"
            >
              <div
                className={homeStyles.editorarea}
                data-id="resize-horizontal"
                style={{ height: motion?.height + 'px' }}
              >
                <div className={homeStyles.editor}>
                  {/* <div className={homeStyles.textareawrapper}>
                  <textarea className={homeStyles.textarea}></textarea>
                </div> */}
                </div>
                <div className={homeStyles.tools}>
                  <div className={homeStyles.icon}>
                    <SendIcon fontSize="large" />
                  </div>
                </div>
                <div
                  data-resize="resize-horizontal"
                  className={homeStyles['resizer-horizontal']}
                  onMouseDown={mouseDown}
                  onMouseUp={mouseUp}
                ></div>
              </div>
              <div className={homeStyles.settings}>
                <div className={homeStyles.header}>
                  <Button>{t('variables')}</Button>
                  <Button>{t('headers')}</Button>
                </div>
              </div>
              <div
                data-resize="resize-vertical"
                className={homeStyles['resizer-vertical']}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
              ></div>
            </div>
            <div className={homeStyles.right}></div>
          </div>
        </div>
      </>
    );
  }
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
