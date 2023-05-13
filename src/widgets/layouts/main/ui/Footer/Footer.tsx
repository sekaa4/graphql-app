import { FC } from 'react';
import { Box, Link } from '@mui/material';
import styles from '@/widgets/layouts/main/ui/Footer/Footer.module.css';
import rssLogo from '@/shared/icons/rs_school_js.svg';
import gitLogo from '@/shared/icons/github-logo.svg';

export const Footer: FC = () => {
  return (    <Box component="footer"
                   className={styles.footer}>
    <div className={styles.rss}>
      <a href="https://rs.school/react/">
        <img src={rssLogo.src} alt="RSS logo" />
      </a>
    </div>
    <div className={styles.git}>
      <img src={gitLogo.src} alt="GitHub Logo" />
      <div className={styles.links}>
        <Link href="https://github.com/ImmelstronDev">GitHub Pavel</Link>
        <Link href="https://github.com/sekaa4">GitHub Sergei</Link>
        <Link href="https://github.com/AntonFartovii">GitHub Anton</Link>
      </div>
    </div>
    <div>© 2023</div>
  </Box>);
};
