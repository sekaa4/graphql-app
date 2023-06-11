import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import cls from '@/pages/auth/signUp/signUp.module.css';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const isValidName = (name: string) => {
  return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/.test(name);
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { t } = useTranslation('common');

  const register = async () => {
    if (isValidName(name) === false) {
      toast.error(t('validName'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const str = await registerWithEmailAndPassword(name, email, password);
    if (str === 'successRegistr') {
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

export default SignUp;
