import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

import { logout } from '@/app/components/FireBase';
import layoutStyles from '@/widgets/layouts/main/ui/MainLayout/layout.module.css';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface MainLayoutProps {}

export const MainLayout = ({ children }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className={layoutStyles.container}>
      <Header logout={logout} />
      <Box component="main" className={layoutStyles.page}>
        {children}
      </Box>
      <Footer />
    </div>
  );
};
