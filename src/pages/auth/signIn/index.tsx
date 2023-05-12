import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import { Sidebar } from '@/widgets/layouts/side-bar';

const SignIN = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/main');
  }, [user, loading, router]);
  return (
    <>
      <Sidebar />
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
            SignIn
          </Button>
          <Button variant="contained" onClick={signInWithGoogle}>
            SignIn with Google
          </Button>
          <div>
            <Link href="/reset">Forgot Password</Link>
          </div>
          <div>
            Do not have an account? <Link href="/auth/signUp">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIN;
