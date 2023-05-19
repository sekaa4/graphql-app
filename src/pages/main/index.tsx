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
  active: boolean;
  deltaLeft: null | number;
  delta: null | number;
  width: null | number;
};

const Home = (props: SSRPageProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setStatusOpen] = useState<boolean>(false);
  const [isDisabled, setDisabledButton] = useState<boolean>(true);
  const [motion, setMotion] = useState<motionState>({
    active: false,
    deltaLeft: null,
    delta: null,
    width: null,
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
    if (motion.active) {
      const deltaLeft = motion.deltaLeft ? motion.deltaLeft : 0;
      const clientX = e.clientX ? e.clientX : 0;
      const delta = motion.delta ? motion.delta : 0;
      setMotion((motion) => ({
        ...motion,
        width: clientX - deltaLeft - delta,
      }));
    }
  };
  const mouseUp = () => {
    setMotion((motion) => ({
      ...motion,
      active: false,
    }));
  };
  const mouseDown = (e: MouseEvent) => {
    const parent = (e.target as HTMLDivElement).closest(`[data-id="resize"]`);
    const coords: DOMRect | undefined = parent?.getBoundingClientRect();
    const width = coords?.width || 0;
    const left = coords?.left || 0;
    const delta: number = e.clientX - width - left;
    setMotion((motion) => ({
      ...motion,
      active: true,
      deltaLeft: left,
      delta: delta,
      width: width,
    }));
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
      {motion.active}
      <div className={homeStyles.left} style={{ width: motion?.width + 'px' }} data-id="resize">
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
          <div className={homeStyles.resizer} onMouseDown={mouseDown} onMouseUp={mouseUp}></div>
        </div>
        <div className={homeStyles.tools}>
          <div className={homeStyles.icon}>
            <SendIcon fontSize="large" />
          </div>
        </div>
      </div>
      <div className={homeStyles.right}></div>
    </div>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
