import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Button } from '@mui/material';
import styles from '@/widgets/layouts/main/ui/Header/Header.module.css';
import { auth } from '@/app/components/FireBase';
import cls from '@/pages/index.module.scss';
import { LangSwitcher } from '@/shared/ui';

type HeaderType = {
  logout: () => void;
};

export const Header: FC<HeaderType> = ({ logout }) => {
  const [user, loading, error] = useAuthState(auth);
  const [scrolled, setScrolled] = useState(false);

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      scrollTop > 0 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const className = !scrolled ? styles.sticky : styles.sticky + ' ' + styles.scroll;

  return (
    <Box component="header" className={className}>
      <div className={styles.wrapper}>
        <LangSwitcher />
        {user ? (
          <Button variant="contained" onClick={logoutHandler}>
            LogOut
          </Button>
        ) : (
          <div className={cls.auth_container}>
            <Link href="/auth/signIn">
              <Button variant="contained">SignIn</Button>
            </Link>

            <Link href="/auth/signUp">
              <Button variant="contained">SignUp</Button>
            </Link>
          </div>
        )}
      </div>
    </Box>
  );
};
