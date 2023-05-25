import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const LangSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'ru' : 'en';
  const { route } = router;

  return changeTo === 'ru' ? (
    <div>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" style={{ height: '30px', minWidth: '60px' }}>
          {t('locale-ru')}
        </Button>
      </Link>
      <Button
        variant="contained"
        disabled
        style={{ pointerEvents: 'none', height: '30px', minWidth: '60px' }}
      >
        {t('locale-eng', { changeTo })}
      </Button>
    </div>
  ) : (
    <div>
      <Button
        variant="contained"
        disabled
        style={{ pointerEvents: 'none', height: '30px', minWidth: '60px' }}
      >
        {t('locale-ru', { changeTo })}
      </Button>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" style={{ height: '30px', minWidth: '60px' }}>
          {t('locale-eng')}
        </Button>
      </Link>
    </div>
  );
};
