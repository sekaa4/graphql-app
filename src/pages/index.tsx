import { Avatar, Button } from '@mui/material';
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

      <h1>Welcome</h1>

      <ul>
        <li>
          <Avatar
            alt="Pavel Demuskov"
            src="https://avatars.githubusercontent.com/u/99259052?s=400&u=967b7f7b9f97e38ba68065bc08056325bed8e1f7&v=4"
          />
        </li>
        <li>
          <Avatar
            alt="Sergey Pansevich"
            src="https://avatars.githubusercontent.com/u/106100393?v=4"
          />
        </li>
        <li>
          <Avatar alt="Anton" src="https://avatars.githubusercontent.com/u/72494592?v=4" />
        </li>
      </ul>
    </>
  );
};

export default Welcome;
