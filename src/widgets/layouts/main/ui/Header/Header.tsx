import { FC, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import styles from '@/widgets/layouts/main/ui/Header/Header.module.css';

export const Header: FC = () => {
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
        <Button variant="contained" onClick={() => {}}>
          LogOut
        </Button>
      </div>
    </Box>
  );
};
