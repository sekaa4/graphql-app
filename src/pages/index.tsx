import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import { auth, logout } from '@/app/components/FireBase';
import { CustomSchema, schemaActions } from '@/entities/CustomSchema';
import { DocumentSchemaLazy } from '@/entities/SideBar/ui/DocumentSchema.lazy';
import homeStyles from '@/pages/home.module.css';
import { fetchSchema } from '@/shared/api/fetchSchema';
import { getCoreServerSideProps, SSRPageProps } from '@/shared/lib/ssr';
import { Sidebar } from '@/widgets/layouts/side-bar';

const Home = (props: SSRPageProps) => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetch = async () => {
      const schema = await fetchSchema();
      if (schema) {
        dispatch(schemaActions.addSchema(schema));
      }
    };

    fetch();
  }, [dispatch]);

  useEffect(() => {
    if (!user) router.push('/welcome');
  }, [router, user]);

  const changeTo = router.locale === 'en' ? 'ru' : 'en';

  return (
    <>
      <Link href="/" locale={changeTo}>
        {changeTo === 'ru' ? (
          <>
            <button>{t('locale-ru', { changeTo })}</button>
            <button disabled>{t('locale-eng', { changeTo })}</button>
          </>
        ) : (
          <>
            <button disabled>{t('locale-ru', { changeTo })}</button>
            <button>{t('locale-eng', { changeTo })}</button>
          </>
        )}
      </Link>
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
