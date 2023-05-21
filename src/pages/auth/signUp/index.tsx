import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import { getCoreServerSideProps } from '@/shared/lib/ssr';
import { Sidebar } from '@/widgets/layouts/side-bar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const register = () => {
    // if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading, router]);
  return (
    <>
      <Sidebar />
      <div>
        <div>
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
            Register
          </Button>
          <Button variant="contained" onClick={signInWithGoogle}>
            Register with Google
          </Button>
          <div>
            Already have an account? <Link href="/auth/signIn">Login</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default SignUp;
