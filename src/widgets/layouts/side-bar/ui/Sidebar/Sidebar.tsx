import { FC } from 'react';

import sidebarStyles from '@/widgets/layouts/side-bar/ui/Sidebar/Sidebar.module.css';

export const Sidebar: FC = () => {
  return (
    <div className={sidebarStyles.container}>
      <div className="sidebar-tool">icon</div>
      <div className="sidebar-tool">icon</div>
      <div className="sidebar-tool">icon</div>
      <div className="sidebar-tool">icon</div>
    </div>
  );
};
