import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const SignIN = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');
  useEffect(() => {
    if (user) router.push('/main');
  }, [user, router]);
  return (
    <>
      <div className="login">
        <div className="login__container">
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
          <Button variant="contained" onClick={() => logInWithEmailAndPassword(email, password)}>
            {t('SignIn')}
          </Button>
          <Button variant="contained" onClick={signInWithGoogle}>
            {t('SignInWithGoogle')}
          </Button>
          <div>
            <Link href="/reset">{t('ForgotPassword')}</Link>
          </div>
          <div>
            {t('DoNotHaveAnAccount')} <Link href="/auth/signUp">{t('Register')}</Link> {t('now')}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default SignIN;
