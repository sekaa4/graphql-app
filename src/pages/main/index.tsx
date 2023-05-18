import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/app/components/FireBase';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
import { DocumentSchemaLazy } from '@/features/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/main/main.module.css';
import { getCoreServerSideProps, SSRPageProps } from '@/shared/lib/ssr';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Sidebar } from '@/widgets/layouts/side-bar';
const GRAPHQL_END_POINT_SCHEMA = 'https://graphql.anilist.co/';

const Home = (props: SSRPageProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [isOpen, setStatusOpen] = useState<boolean>(false);
  const [isDisabled, setStatusButton] = useState<boolean>(true);
  const { t } = useTranslation('common');

  const [getSchemaByAPI, { data: currentSchema, error: errorAPI, isLoading }] = fetchSchemaByAPI();

  useEffect(() => {
    getSchemaByAPI(GRAPHQL_END_POINT_SCHEMA);
  }, [getSchemaByAPI]);

  useEffect(() => {
    if (!user) router.push('/');
  }, [router, user]);

  useEffect(() => {
    if (currentSchema) setStatusButton(false);
  }, [currentSchema]);

  return (
    <>
      <Sidebar />
      <input className={homeStyles.input} />
      <main className={homeStyles.editor}>
        <div className={homeStyles.textareawrapper}>
          <textarea className={homeStyles.textarea}></textarea>
        </div>
        <div></div>
      </main>
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
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
