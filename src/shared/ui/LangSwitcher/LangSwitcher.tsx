import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import cls from '@/shared/ui/LangSwitcher/LangSwitcher.module.css';

export const LangSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'ru' : 'en';
  const { route } = router;
  const button = {
    minWidth: '50px',
    height: '36.5px',
    padding: '10px',
  };

  const desabledButton = {
    minWidth: '50px',
    height: '36.5px',
    padding: '10px',
    pointerEvents: 'none',
    color: 'white',
    backgroundColor: '#4e4e4e',
  };

  return changeTo === 'ru' ? (
    <div className={cls.switch_container}>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" sx={button}>
          {t('locale-ru')}
        </Button>
      </Link>
      <Button variant="contained" sx={desabledButton}>
        {t('locale-eng', { changeTo })}
      </Button>
    </div>
  ) : (
    <div className={cls.switch_container}>
      <Button variant="contained" sx={desabledButton}>
        {t('locale-ru', { changeTo })}
      </Button>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" sx={button}>
          {t('locale-eng')}
        </Button>
      </Link>
    </div>
  );
};
