import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logout } from '@/app/components/FireBase';
import { CustomSchema } from '@/entities/CustomSchema';
import { DocumentSchemaLazy } from '@/entities/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/home.module.css';
import { getCoreServerSideProps, SSRPageProps } from '@/shared/lib/ssr';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { Sidebar } from '@/widgets/layouts/side-bar';

const Home = (props: SSRPageProps) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!user) router.push('/welcome');
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
      {t('h1')}
      {/* need draw when click on icon */}
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentSchemaLazy>
          <CustomSchema />
        </DocumentSchemaLazy>
      </Suspense>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Home;
