import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { NextIntlProvider } from 'next-intl'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider 
      messages={pageProps.messages}
    >
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </NextIntlProvider>
  )
}
export default MyApp
