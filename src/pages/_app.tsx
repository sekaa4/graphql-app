import '@/shared/design/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';

import { StoreProvider } from '@/app/providers/StoreProvider';
import ErrorBoundary from '@/shared/ui/ErrorBoundary/ErrorBoundary';
import { FallBackErrorUI } from '@/shared/ui/FallBackErrorUI/FallBackErrorUI';
import Preloader from '@/shared/ui/Preloader/Preloader';
import { MainLayout } from '@/widgets/layouts/main';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary fallBackUIComponent={<FallBackErrorUI />}>
      <StoreProvider>
        <Preloader>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Preloader>
      </StoreProvider>
      <ToastContainer />
    </ErrorBoundary>
  );
};

const App = appWithTranslation(MyApp);

export default App;
