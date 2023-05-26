import { CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/app/components/FireBase';
import cls from '@/shared/ui/Preloader/Preloader.module.scss';

interface PreloaderProps {
  loading?: boolean;
}
const Preloader = (props: PropsWithChildren<PreloaderProps>) => {
  const { children } = props;
  const [, loading] = useAuthState(auth);

  return (
    <div className={cls.preload_container}>
      {loading && <CircularProgress />}
      {!loading && children}
    </div>
  );
};

export default Preloader;
