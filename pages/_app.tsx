import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
// @ts-expect-error
// usesnippet is not typesafe
import { SnipcartProvider } from 'use-snipcart';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SnipcartProvider>
        <Layout categories={pageProps.categories} collections={pageProps.collections}>
          <Component {...pageProps} />
        </Layout>
      </SnipcartProvider>
  )
}
