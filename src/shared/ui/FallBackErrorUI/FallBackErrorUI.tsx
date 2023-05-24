import { useTranslation } from 'next-i18next';
import { FC } from 'react';

export const FallBackErrorUI: FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <h3>{t('errorBoundary')}</h3>
    </>
  );
};
