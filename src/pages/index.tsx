import { Avatar } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { DescDeveloper1 } from '@/features/SideBar';
import { DescDeveloper2 } from '@/features/SideBar/ui/DescDeveloper2';
import { DescDeveloper3 } from '@/features/SideBar/ui/DescDeveloper3';
import { getCoreServerSideProps } from '@/shared/lib/ssr';

const Welcome = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <h1>{t('Welcome')}</h1>

      <ul>
        <li>
          <Avatar
            alt="Pavel Demuskov"
            src="https://avatars.githubusercontent.com/u/99259052?s=400&u=967b7f7b9f97e38ba68065bc08056325bed8e1f7&v=4"
          />
          <DescDeveloper1 />
        </li>
        <li>
          <Avatar
            alt="Sergey Pansevich"
            src="https://avatars.githubusercontent.com/u/106100393?v=4"
          />
          <DescDeveloper2 />
        </li>
        <li>
          <Avatar alt="Anton" src="https://avatars.githubusercontent.com/u/72494592?v=4" />
          <DescDeveloper3 />
        </li>
      </ul>
    </>
  );
};

export const getServerSideProps = getCoreServerSideProps(['common']);

export default Welcome;
