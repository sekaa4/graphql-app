import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

import { auth, logout } from '@/app/components/FireBase';
import cls from '@/widgets/layouts/AuthContainer/ui/Auth/AuthContainer.module.scss';

export const AuthContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  if (router.pathname === '/' && user) {
    return (
      <div className={cls.auth_container}>
        <Link href="/main">
          <Button variant="contained">{t('ToMainPage')}</Button>
        </Link>
        <Button variant="contained" onClick={logout}>
          {t('Logout')}
        </Button>
      </div>
    );
  } else if (router.pathname !== '/main' && !user) {
    return (
      <div className={cls.auth_container}>
        <Link href="/auth/signIn">
          <Button variant="contained">{t('SignIn')}</Button>
        </Link>

        <Link href="/auth/signUp">
          <Button variant="contained">{t('SignUp')}</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={cls.auth_container}>
        <Button variant="contained" onClick={logout}>
          {t('Logout')}
        </Button>
      </div>
    );
  }
};
