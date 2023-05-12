import { useTranslation } from 'next-i18next';

export const DescDeveloper2 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div>{t('nameDeveloper2')}</div>
      <div>{t('descDeveloper2')}</div>
    </div>
  );
};
