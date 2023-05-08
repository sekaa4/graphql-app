import { ReactNode } from 'react';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
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
