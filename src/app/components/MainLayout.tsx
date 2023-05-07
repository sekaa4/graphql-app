import Header from "@/app/components/Header";
import React, {ReactNode} from 'react';
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: LayoutProps) => {
  return (
    <div className="graphql-wrapper">
      <Sidebar/>
      <div className="graphql-container">
        <Header/>
        <input className="graphql-input"/>
        <div className="graphql-editor">
          <div className="graphql-textarea-wrapper">
            <textarea className="graphql-textarea"></textarea>
          </div>
          <div className="graphql-editor-right"></div>
        </div>

        {children}
        <Footer/>
      </div>
    </div>
  );
};

export default MainLayout;
