import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Suspense, useEffect, useState } from 'react';
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
import { Sidebar } from '@/widgets/layouts/side-bar';

const Home = (props: SSRPageProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setStatusOpen] = useState<boolean>(false);
  const [isDisabled, setDisabledButton] = useState<boolean>(true);
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

  return (
    <>
      <Sidebar />
      <Button variant="contained" onClick={() => logout()}>
        LogOut
      </Button>
      <SearchBar isError={isError} isLoading={isLoading} />
      <div className={homeStyles.textareawrapper}>
        <Editor />
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
      <div></div>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
