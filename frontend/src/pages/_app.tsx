// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux'
import { store } from '../network/store'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>

  )
}

export default MyApp

