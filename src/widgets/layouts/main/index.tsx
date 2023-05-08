import { ReactNode } from 'react';
import { Footer } from '@/widgets/layouts/main/components/Footer';
import { Header } from '@/widgets/layouts/main/components/Header';
import { Sidebar } from '@/widgets/layouts/main/components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="graphql-wrapper">
      <Sidebar />
      <div className="graphql-container">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
