import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/app/components/FireBase';
import { CustomSchema } from '@/entities/CustomSchema';
import { fetchSchemaByAPI } from '@/features/SideBar/api/shemaByAnyAPI';
import { DocumentSchemaLazy } from '@/features/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/home.module.css';
import { getCoreServerSideProps, SSRPageProps } from '@/shared/lib/ssr';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Sidebar } from '@/widgets/layouts/side-bar';

const GRAPHQL_END_POINT_SCHEMA = 'https://rickandmortyapi.com/graphql';

const Home = (props: SSRPageProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  const [getSchemaByAPI, { data: currentSchema, error: errorAPI, isLoading }] = fetchSchemaByAPI();

  useEffect(() => {
    getSchemaByAPI(GRAPHQL_END_POINT_SCHEMA);
  }, [getSchemaByAPI]);

  useEffect(() => {
    if (!user) router.push('/index');
  }, [router, user]);

  return (
    <>
      <LangSwitcher />
      <Sidebar />
      <Button variant="contained" onClick={() => logout()}>
        LogOut
      </Button>
      <input className={homeStyles.input} />
      <main className={homeStyles.editor}>
        <div className={homeStyles.textareawrapper}>
          <textarea className={homeStyles.textarea}></textarea>
        </div>
        <div></div>
      </main>
      {/* need draw when click on icon */}
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentSchemaLazy>
          <CustomSchema schema={currentSchema} />
        </DocumentSchemaLazy>
      </Suspense>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
