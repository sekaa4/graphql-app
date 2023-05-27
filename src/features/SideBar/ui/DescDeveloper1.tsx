import { useTranslation } from 'next-i18next';

import cls from '@/features/SideBar/ui/DescDeveloper.module.scss';

export const DescDeveloper1 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className={cls.dev_name}>{t('nameDeveloper1')}</div>
      <div className={cls.dev_description}>{t('descDeveloper1')}</div>
      <div className={cls.dev_description}>{t('descDeveloper11')}</div>
    </div>
  );
};
