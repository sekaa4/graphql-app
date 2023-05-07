import '@/shared/design/globals.scss';

import type { AppProps } from 'next/app';
import MainLayout from "@/app/components/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>);
}
