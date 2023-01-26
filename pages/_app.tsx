import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout categories={pageProps.categories} collections={pageProps.collections}>
        <Component {...pageProps} />
      </Layout>
    </Provider>

  )
}
