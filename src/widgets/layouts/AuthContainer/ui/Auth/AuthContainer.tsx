import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { auth, logout } from '@/app/components/FireBase';
import { useAppDispatch } from '@/shared/hooks';
import cls from '@/widgets/layouts/AuthContainer/ui/Auth/AuthContainer.module.scss';

export const AuthContainer = () => {
  const [user, ,] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  const dispatch = useAppDispatch();
  const handleClick = () => {
    toast.dismiss();
    dispatch({
      type: 'RESET',
    });
    logout();
  };

  if (router.pathname === '/' && user) {
    return (
      <div className={cls.auth_container}>
        <Link href="/main">
          <Button className={cls.btn} variant="contained">
            {t('ToMainPage')}
          </Button>
        </Link>
        <Button className={cls.btn} variant="contained" onClick={handleClick}>
          {t('Logout')}
        </Button>
      </div>
    );
  } else if (router.pathname !== '/main' && !user) {
    return (
      <div className={cls.auth_container}>
        <Link href="/auth/signIn">
          <Button className={cls.btn} variant="contained">
            {t('SignIn')}
          </Button>
        </Link>

        <Link href="/auth/signUp">
          <Button className={cls.btn} variant="contained">
            {t('SignUp')}
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={cls.auth_container}>
        <Button className={cls.btn} variant="contained" onClick={handleClick}>
          {t('Logout')}
        </Button>
      </div>
    );
  }
};
