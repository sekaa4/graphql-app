import { CircularProgress, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/app/components/FireBase';
import { Editor } from '@/features/Editor';
import { getSearchBarInput, SearchBar, searchBarActions } from '@/features/SearchBar';
import { documentationActions } from '@/features/SideBar';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
import { DocumentSchemaLazy } from '@/features/SideBar/ui/DocumentSchema.lazy';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { Sidebar } from '@/widgets/layouts/side-bar';

import homeStyles from './main.module.css';

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, ,] = useAuthState(auth);
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

  const handleDocClick = () => {
    currentSchema && setStatusOpen(!isOpen);
  };

  if (!user) {
    return <></>;
  } else {
    return (
      <>
        <div className={homeStyles['main-container']}>
          <Sidebar disabled={isDisabled} handleDocClick={handleDocClick} />
          <div className={homeStyles['whithout-bar']}>
            {isOpen && <Divider className={homeStyles['divider']} orientation="vertical" />}

            <div>
              {isOpen && (
                <>
                  <Suspense
                    fallback={
                      <div className={homeStyles['circular-section']}>
                        <CircularProgress className={homeStyles.circular} />
                      </div>
                    }
                  >
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
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
