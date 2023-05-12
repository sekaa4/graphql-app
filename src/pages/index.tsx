import { Button } from '@mui/material';
import Link from 'next/link';

import { Sidebar } from '@/widgets/layouts/side-bar';

import cls from '@/pages/index.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/components/FireBase';

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Sidebar />
      {!user ? (
        <div className={cls.auth_container}>
          <Link href="/auth/signIn">
            <Button variant="contained">SignIn</Button>
          </Link>

          <Link href="/auth/signUp">
            <Button variant="contained">SignUp</Button>
          </Link>
        </div>
      ) : (
        <div className={cls.auth_container}>
          <Link href="/main">
            <Button variant="contained"> Go to Main Page</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Welcome;
