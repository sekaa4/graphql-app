import HistoryIcon from '@mui/icons-material/History';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

import sidebarStyles from '@/widgets/layouts/side-bar/ui/Sidebar/Sidebar.module.css';

interface SidebarProps {
  disabled: boolean;
  handleDocClick: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { disabled, handleDocClick } = props;

  return (
    <div className={sidebarStyles.container}>
      <div className={sidebarStyles.icon}>
        <IconButton disabled={disabled} onClick={handleDocClick}>
          <MenuBookIcon color={disabled ? undefined : 'success'} />
        </IconButton>
      </div>
      <div className={sidebarStyles.icon}>
        <IconButton>
          <HistoryIcon />
        </IconButton>
      </div>
      <div className={sidebarStyles.icon}>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </div>
      <div className={sidebarStyles.icon}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};
