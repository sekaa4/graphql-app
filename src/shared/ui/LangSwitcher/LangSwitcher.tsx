import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LangSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'ru' : 'en';

  return changeTo === 'ru' ? (
    <div>
      <Link href="/" locale={changeTo}>
        <Button variant="contained">{t('locale-ru')}</Button>
      </Link>
      <Button variant="contained" disabled style={{ pointerEvents: 'none' }}>
        {t('locale-eng', { changeTo })}
      </Button>
    </div>
  ) : (
    <div>
      <Button variant="contained" disabled style={{ pointerEvents: 'none' }}>
        {t('locale-ru', { changeTo })}
      </Button>
      <Link href="/" locale={changeTo}>
        <Button variant="contained">{t('locale-eng')}</Button>
      </Link>
    </div>
  );
};
