import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </AuthContextProvider>

  )
}
