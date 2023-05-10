import { PropsWithChildren } from 'react';

import layoutStyles from '@/widgets/layouts/main/ui/MainLayout/layout.module.css';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface MainLayoutProps {}

export const MainLayout = ({ children }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.container}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
