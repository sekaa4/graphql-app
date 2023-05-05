import Header from "@/app/components/Header";
import React, {ReactNode} from 'react';
import Sidebar from "@/app/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: LayoutProps) => {
  return (
    <div className="graphql-wrapper">
      <Sidebar/>
      <div className="graphql-container">
        <Header/>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
