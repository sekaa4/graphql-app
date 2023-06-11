import MenuBookIcon from '@mui/icons-material/MenuBook';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';

import sidebarStyles from '@/widgets/layouts/side-bar/ui/Sidebar/Sidebar.module.css';

interface SidebarProps {
  disabled: boolean;
  handleDocClick: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { disabled, handleDocClick } = props;
  const { t } = useTranslation('common');
  return (
    <div className={sidebarStyles.container}>
      <div className={sidebarStyles.icon} title={t('documentationTooltips')}>
        <IconButton disabled={disabled} onClick={handleDocClick}>
          <MenuBookIcon color={disabled ? undefined : 'success'} />
        </IconButton>
      </div>
    </div>
  );
};
