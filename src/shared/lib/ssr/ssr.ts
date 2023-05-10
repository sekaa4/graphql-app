import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { SSRConfig } from 'next-i18next';

import { getTranslationsConfig } from '../i18n/translations';

export type SSRPageProps = {
  isServerRendering: boolean;
  _nextI18Next: SSRConfig['_nextI18Next'];
};

export const getCoreServerSideProps = (
  namespaces: string[] = []
): GetServerSideProps<SSRPageProps> => {
  const getServerSideProps: GetServerSideProps<SSRPageProps> = async (
    context
  ): Promise<GetServerSidePropsResult<SSRPageProps>> => {
    const i18n = await getTranslationsConfig(context, namespaces);

    return {
      props: {
        isServerRendering: true,
        _nextI18Next: i18n._nextI18Next,
      },
    };
  };

  return getServerSideProps;
};
