import { useTranslation } from 'next-i18next';

import cls from '@/features/SideBar/ui/DescDeveloper.module.css';

export const DescDeveloper2 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className={cls.dev_name}>{t('nameDeveloper2')}</div>
      <div className={cls.dev_description}>{t('descDeveloper2')}</div>
    </div>
  );
};
