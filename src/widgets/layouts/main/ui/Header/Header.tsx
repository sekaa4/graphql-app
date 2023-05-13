import { FC } from 'react';
import { Box, Button } from '@mui/material';
import styles from '@/widgets/layouts/main/ui/Header/Header.module.css';

export const Header: FC = () => {
  return (
    <Box component="header" className={styles.sticky}>
      <div className={styles.wrapper}>
        <Button>button</Button>
      </div>
    </Box>
  );
};
