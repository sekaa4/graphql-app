import { Button } from '@mui/material';
import Link from 'next/link';

import { Sidebar } from '@/widgets/layouts/side-bar';

const Welcome = () => {
  return (
    <>
      <Sidebar />
      <Link href="/signIn">
        <Button variant="contained">SignIn</Button>
      </Link>

      <Link href="/signUp">
        <Button variant="contained">SignUp</Button>
      </Link>
    </>
  );
};

export default Welcome;
