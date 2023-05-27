import { useTranslation } from 'next-i18next';

import cls from '@/features/SideBar/ui/DescDeveloper.module.scss';

export const DescDeveloper3 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className={cls.dev_name}>{t('nameDeveloper3')}</div>
      <div className={cls.dev_description}>{t('descDeveloper3')}</div>
    </div>
  );
};
