import { Box, Link } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import gitLogo from '@/shared/icons/github-logo.svg';
import rssLogo from '@/shared/icons/rs_school_js.svg';
import styles from '@/widgets/layouts/main/ui/Footer/Footer.module.css';

export const Footer: FC = () => {
  const { t } = useTranslation('common');
  return (
    <Box component="footer" className={styles.footer}>
      <div className={styles.rss}>
        <a href="https://rs.school/react/">
          <Image src={rssLogo} alt="RSS logo" priority />
        </a>
      </div>
      <div className={styles.git}>
        <Image src={gitLogo} alt="GitHub Logo" width={50} height={50} priority />
        <div className={styles.links}>
          <Link href="https://github.com/ImmelstronDev">{t('nameDeveloper1')}</Link>
          <Link href="https://github.com/sekaa4">{t('nameDeveloper2')}</Link>
          <Link href="https://github.com/AntonFartovii">{t('nameDeveloper3')}</Link>
        </div>
      </div>
      <div>{t('year')}</div>
    </Box>
  );
};
