import '@/shared/design/globals.scss';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { StoreProvider } from '@/app/providers/StoreProvider';
import { MainLayout } from '@/widgets/layouts/main';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </StoreProvider>
  );
};

const App = appWithTranslation(MyApp);

export default App;
