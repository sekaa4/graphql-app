import { Avatar } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { DescDeveloper1 } from '@/features/SideBar';
import { DescDeveloper2 } from '@/features/SideBar/ui/DescDeveloper2';
import { DescDeveloper3 } from '@/features/SideBar/ui/DescDeveloper3';
import cls from '@/pages/index.module.scss';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const Welcome = () => {
  const { t } = useTranslation('common');

  return (
    <div className={cls.welcome_container}>
      <h1 className={cls.h1}>{t('Welcome')}</h1>
      <h2 className={cls.description}>{t('descriptionApp')} </h2>

      <ul className={cls.developers_container}>
        <li>
          <a href="https://github.com/ImmelstronDev">
            <Avatar
              alt="Pavel Demuskov"
              src="https://avatars.githubusercontent.com/u/99259052?s=400&u=967b7f7b9f97e38ba68065bc08056325bed8e1f7&v=4"
              className={cls.avatar}
            />
          </a>
          <DescDeveloper1 />
        </li>
        <li>
          <a href="https://github.com/sekaa4">
            <Avatar
              alt="Sergey Pansevich"
              src="https://avatars.githubusercontent.com/u/106100393?v=4"
              className={cls.avatar}
            />
          </a>
          <DescDeveloper2 />
        </li>
        <li>
          <a href="https://github.com/AntonFartovii">
            <Avatar
              alt="Anton"
              src="https://avatars.githubusercontent.com/u/72494592?v=4"
              className={cls.avatar}
            />
          </a>
          <DescDeveloper3 />
        </li>
      </ul>
    </div>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Welcome;
