import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import cls from '@/pages/auth/signIn/signIn.module.css';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const SignIN = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, ,] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation(['common']);
  useEffect(() => {
    if (user) router.push('/main');
  }, [user, router]);

  const signInHandleClick = async () => {
    const str = await logInWithEmailAndPassword(email, password);
    if (str === 'success') {
      toast.success(t(str), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      str &&
        toast.error(t(str), {
          position: toast.POSITION.TOP_CENTER,
        });
    }
  };

  if (user) {
    return <></>;
  } else {
    return (
      <div className={cls.container_signin}>
        <div className={cls.wrapper}>
          <TextField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button variant="contained" onClick={signInHandleClick}>
            {t('SignIn')}
          </Button>
          <Button variant="contained" onClick={signInWithGoogle}>
            {t('SignInWithGoogle')}
          </Button>
          <div>
            {t('DoNotHaveAnAccount')} <Link href="/auth/signUp">{t('Register')}</Link> {t('now')}
          </div>
        </div>
        <Link className={cls.link} href="/">
          <Button
            variant="contained"
            onClick={() => {
              toast.dismiss();
            }}
          >
            {t('toWelcomePage')}{' '}
          </Button>
        </Link>
      </div>
    );
  }
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default SignIN;
