import { useTranslation } from 'next-i18next';

export const DescDeveloper3 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div>{t('nameDeveloper3')}</div>
      <div>{t('descDeveloper3')}</div>
    </div>
  );
};
