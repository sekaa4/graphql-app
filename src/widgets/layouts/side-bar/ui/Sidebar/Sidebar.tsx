import HistoryIcon from '@mui/icons-material/History';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from 'react';

import sidebarStyles from '@/widgets/layouts/side-bar/ui/Sidebar/Sidebar.module.css';

export const Sidebar: FC = () => {
  return (
    <div className={sidebarStyles.container}>
      <div className={sidebarStyles.icon}>
        <MenuBookIcon />
      </div>
      <div className={sidebarStyles.icon}>
        <HistoryIcon />
      </div>
      <div className={sidebarStyles.icon}>
        <RefreshIcon />
      </div>
      <div className={sidebarStyles.icon}>
        <SettingsIcon />
      </div>
    </div>
  );
};
