import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MouseEvent, Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/app/components/FireBase';
import { Editor } from '@/features/Editor';
import { getSearchBarInput, SearchBar, searchBarActions } from '@/features/SearchBar';
import { documentationActions } from '@/features/SideBar';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
import { DocumentSchemaLazy } from '@/features/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/main/main.module.css';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getCoreServerSideProps, SSRPageProps } from '@/shared/lib/ssr';

type motionState = {
  activeVertical: boolean;
  activeHorizontal: boolean;
  deltaLeft: null | number;
  deltaTop: null | number;
  delta: null | number;
  width: null | number;
  height: null | number;
};

const Home = (props: SSRPageProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
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
  const [width, setWidth] = useState<number | null>(null);
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

  const mouseMove = (e: MouseEvent) => {
    if (motion.activeVertical) {
      const deltaLeft = motion.deltaLeft ? motion.deltaLeft : 0;
      const clientX = e.clientX ? e.clientX : 0;
      const delta = motion.delta ? motion.delta : 0;
      setMotion((motion) => ({
        ...motion,
        width: clientX - deltaLeft - delta,
      }));
    } else if (motion.activeHorizontal) {
      const deltaTop = motion.deltaTop ? motion.deltaTop : 0;
      const clientY = e.clientY ? e.clientY : 0;
      const delta = motion.delta ? motion.delta : 0;
      setMotion((motion) => ({
        ...motion,
        height: clientY - deltaTop - delta,
      }));
    }
  };
  const mouseUp = () => {
    setMotion((motion) => ({
      ...motion,
      activeVertical: false,
      activeHorizontal: false,
    }));
  };
  const mouseDown = (e: MouseEvent) => {
    const dataResize = (e.target as HTMLDivElement).dataset?.resize;
    const parent = (e.target as HTMLDivElement).closest(`[data-id=${dataResize}]`);
    const coords: DOMRect | undefined = parent?.getBoundingClientRect();
    if (dataResize === 'resize-vertical') {
      const width = coords?.width || 0;
      const left = coords?.left || 0;
      const delta: number = e.clientX - width - left;
      setMotion((motion) => ({
        ...motion,
        activeVertical: true,
        deltaLeft: left,
        delta: delta,
        width: width,
      }));
    }
    if (dataResize === 'resize-horizontal') {
      const height = coords?.height || 0;
      const top = coords?.top || 0;
      const delta: number = e.clientY - height - top;
      setMotion((motion) => ({
        ...motion,
        activeHorizontal: true,
        deltaTop: top,
        delta: delta,
        height: height,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove as any);
    window.addEventListener('mouseup', mouseUp as any);

    return () => {
      window.removeEventListener('mousemove', mouseMove as any);
      window.removeEventListener('mouseup', mouseUp as any);
    };
  }, [mouseDown, mouseUp, mouseMove]);

  return (
    <div className={homeStyles.wrapper}>
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
            <SearchBar isError={isError} isLoading={isLoading} />
            <div className={homeStyles.textareawrapper}>
              <textarea className={homeStyles.textarea}></textarea>
            </div>
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={() => {
                currentSchema && setStatusOpen(!isOpen);
              }}
            >
              Docs
            </Button>
            {isOpen && (
              <Suspense fallback={<div>Loading...</div>}>
                <DocumentSchemaLazy schema={currentSchema} />
              </Suspense>
            )}
            {!isLoading && errorAPI && (
              <>
                <div>{t('invalidSchema')}</div>
                <div>{JSON.stringify(errorAPI, null, 2)}</div>
              </>
            )}
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
            <Button>Variables</Button>
            <Button>Headers</Button>
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
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
