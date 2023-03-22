import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux'
import { store } from '../network/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ToastContainer />
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
    </>
  )
}

export default MyApp

