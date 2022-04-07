import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from './../themes';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import useSWR, { SWRConfig } from 'swr'
//import { CartProvider, UiProvider, AuthProvider } from 'context'
import { SessionProvider } from "next-auth/react"
import { AuthProvider, UiProvider } from 'context';
import { CartProvider } from 'context';

function MyApp({ Component, pageProps:{ session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_ID || '' }}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
          >
            <AuthProvider>
                <CartProvider>
                  <UiProvider>
                    <ThemeProvider theme={lightTheme}>
                      <CssBaseline />
                      <Component {...pageProps} />
                    </ThemeProvider>
                  {/*
                  */}
                </UiProvider>
              </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
