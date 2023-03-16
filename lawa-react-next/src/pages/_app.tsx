import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Lato } from '@next/font/google'

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <style jsx global>{`
        html {
          font-family: ${lato.style.fontFamily};
        }
      `}</style>
    <Component {...pageProps} />
  </>

}
