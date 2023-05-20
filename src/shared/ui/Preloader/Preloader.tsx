import { CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/app/components/FireBase';

interface PreloaderProps {
  loading?: boolean;
}
const Preloader = (props: PropsWithChildren<PreloaderProps>) => {
  const { children } = props;
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && children}
    </>
  );
};

export default Preloader;
