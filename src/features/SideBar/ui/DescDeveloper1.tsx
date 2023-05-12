import { useTranslation } from 'next-i18next';

export const DescDeveloper1 = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div>{t('nameDeveloper1')}</div>
      <div>{t('descDeveloper1')}</div>
    </div>
  );
};
