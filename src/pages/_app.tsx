import '@/shared/design/styles/index.scss';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { StoreProvider } from '@/app/providers/StoreProvider';
import Preloader from '@/shared/ui/Preloader/Preloader';
import { MainLayout } from '@/widgets/layouts/main';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Preloader>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Preloader>
    </StoreProvider>
  );
};

const App = appWithTranslation(MyApp);

export default App;
