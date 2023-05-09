import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '@/app/components/FireBase';
import { Sidebar } from '@/widgets/layouts/side-bar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading, router]);
  return (
    <>
      <Sidebar />
      <div className="register">
        <div className="register__container">
          <TextField
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <TextField
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <TextField
            type="password"
            className="register__textBox"
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
            Already have an account? <Link href="/signIn">Login</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
