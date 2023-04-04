import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.min.css'
import "react-datepicker/dist/react-datepicker.min.css"
import { far } from '@fortawesome/pro-regular-svg-icons'
const { library, config } = require('@fortawesome/fontawesome-svg-core')
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import it from 'date-fns/locale/it'
import GlobalStyles from '../styles/GlobalStyles.styles'
import { appTheme } from '../styles/ThemeVariables'
import store from '../redux/store'
import Layout from '../components/Layout/Layout.component'
import {useEffect} from 'react'

registerLocale("it", it)
setDefaultLocale("it")
library.add(far)
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => { require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}