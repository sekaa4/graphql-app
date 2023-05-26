import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import cls from '@/pages/auth/signUp/signUp.module.scss';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  const register = () => {
    // if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.push('/main');
  }, [user, loading, router]);

  if (user) {
    return <></>;
  } else {
    return (
      <div className={cls.container_signup}>
        <div className={cls.wrapper}>
          {/* {!name && <Alert severity="error">Please enter name</Alert>} */}
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <TextField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button variant="contained" onClick={register}>
            {t('Registered')}
          </Button>
          <Button variant="contained" onClick={signInWithGoogle}>
            {t('RegisterWithGoogle')}
          </Button>
          <div>
            {t('AlreadyHaveAnAccount')} <Link href="/auth/signIn">{t('SignIn')}</Link> {t('now')}
          </div>
        </div>
      </div>
    );
  }
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default SignUp;
