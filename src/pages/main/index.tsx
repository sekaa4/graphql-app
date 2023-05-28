import { CircularProgress, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

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
    fetchSchemaByAPI({ fixedCacheKey: 'schemaByAPI' });

  useEffect(() => {
    if (curSearchBarInput) {
      setDisabledButton(true);
      setStatusOpen(false);
      dispatch(documentationActions.setupInitialState());
      dispatch(searchBarActions.changeStatusSearchBarInput(false));
      getSchemaByAPI(curSearchBarInput);
    }
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

  useEffect(() => {
    if (!isLoading && isError && errorAPI) {
      toast.error(
        `${t('invalidSchema')}${
          ('status' in errorAPI && errorAPI.status === 'FETCH_ERROR' && t('fetchError')) || ''
        }`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    if (!isLoading && !isError && currentSchema) {
      toast.success(t('fetchSuccess'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [currentSchema, errorAPI, isError, isLoading, t]);

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
