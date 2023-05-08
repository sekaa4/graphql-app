import '@/shared/design/globals.scss';

import type { AppProps } from 'next/app';
import MainLayout from '@/widgets/layouts/main';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};
export default App;
