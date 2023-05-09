import { PropsWithChildren } from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface MainLayoutProps {}

export const MainLayout = ({ children }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <div className="graphql-wrapper">
      <div className="graphql-container">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
