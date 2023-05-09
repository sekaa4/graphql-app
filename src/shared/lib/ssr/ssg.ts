import { GetStaticProps, GetStaticPropsResult } from 'next';
import { SSRConfig } from 'next-i18next';

import { getTranslationsConfig } from '@/shared/lib/i18n/translations';

export type SSGPageProps = {
  isStaticRendering: boolean;
  _nextI18Next: SSRConfig['_nextI18Next'];
};

export const getCoreStaticSideProps = (namespaces: string[] = []): GetStaticProps<SSGPageProps> => {
  const getStaticProps: GetStaticProps<SSGPageProps> = async (
    context
  ): Promise<GetStaticPropsResult<SSGPageProps>> => {
    const i18n = await getTranslationsConfig(context, namespaces);

    return {
      props: {
        isStaticRendering: true,
        _nextI18Next: i18n._nextI18Next,
      },
    };
  };

  return getStaticProps;
};
