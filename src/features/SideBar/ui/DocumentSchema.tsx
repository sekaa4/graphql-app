import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

const SideBar = (props: PropsWithChildren) => {
  const { children } = props;
  const { t } = useTranslation('common');

  return (
    <div>
      <div>{t('doc')}</div>
      <div>{t('descriptionDoc')}</div>
      {children}
    </div>
  );
};

export default SideBar;
