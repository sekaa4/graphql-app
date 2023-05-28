import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import cls from '@/shared/ui/LangSwitcher/LangSwitcher.module.scss';

export const LangSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'ru' : 'en';
  const { route } = router;

  return changeTo === 'ru' ? (
    <div className={cls.switch_container}>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" className={cls.button}>
          {t('locale-ru')}
        </Button>
      </Link>
      <Button variant="contained" disabled className={cls.button}>
        {t('locale-eng', { changeTo })}
      </Button>
    </div>
  ) : (
    <div className={cls.switch_container}>
      <Button variant="contained" disabled className={cls.button}>
        {t('locale-ru', { changeTo })}
      </Button>
      <Link href={route} locale={changeTo}>
        <Button variant="contained" className={cls.button}>
          {t('locale-eng')}
        </Button>
      </Link>
    </div>
  );
};
