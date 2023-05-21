import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import cls from '@/pages/index.module.scss';
import { LangSwitcher } from '@/shared/ui';
import { AuthContainer } from '@/widgets/layouts/AuthContainer';
import styles from '@/widgets/layouts/main/ui/Header/Header.module.css';

type HeaderType = {
  logout: () => void;
};

export const Header: FC<HeaderType> = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <AuthContainer />
      </div>
    </Box>
  );
};
