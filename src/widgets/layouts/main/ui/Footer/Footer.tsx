import { FC } from 'react';
import styles from '@/widgets/layouts/main/ui/Footer/Footer.module.css';
import rssLogo from '@/shared/icons/rs_school_js.svg';
import gitLogo from '@/shared/icons/github-logo.svg';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.rss}>
        <a href="https://rs.school/js/">
          <img src={rssLogo.src} alt="RSS logo" />
        </a>
      </div>
      <div className={styles.git}>
        <img src={gitLogo.src} alt="GitHub Logo"/>
        <div className={styles.links}>
          <a href="https://github.com/ImmelstronDev">GitHub Pavel</a>
          <a href="https://github.com/sekaa4">GitHub Sergei</a>
          <a href="https://github.com/AntonFartovii">GitHub Anton</a>
        </div>
      </div>
      <div>
        © 2023
      </div>
    </footer>);
};
