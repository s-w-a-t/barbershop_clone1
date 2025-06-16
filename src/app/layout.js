import React from 'react'
import Script from 'next/script'
import './globals.scss'
import { Montserrat, Rubik } from 'next/font/google'
import clsx from 'clsx'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Lines from '@/components/Lines'
import { performRequest } from '@/lib/datocms'

const rubik = Rubik({
  weight: ['400', '500', '600', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-rubik',
})

const montserrat = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Brutal Barbershop',
  description:
    'Brutal barbershop - це більш, ніж просто чоловіча перукарня. Місце, де вас проведуть за ручку до неповторного стилю за допомогою пари ножиць та машинки.',
}

const GLOBAL_QUERY = `
  query Global {
  layout {
    logo {
      url
    }
    menu {
      name
      link
    }
    copyright
    orderLabel
    orderLink
    telegram
    instagram
  }
}
`

const RootLayout = async ({ children }) => {
  const { data } = await performRequest({ query: GLOBAL_QUERY })
  const { logo, menu, copyright, orderLabel, orderLink, telegram, instagram } =
    data?.layout || {}
  return (
    <html lang="uk">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWH44WL5');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={clsx(rubik.variable, montserrat.variable)}>
         {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KWH44WL5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header
          logo={logo.url}
          menu={menu}
          orderLabel={orderLabel}
          orderLink={orderLink}
        />
        <main>{children}</main>
        <Footer
          telegram={telegram}
          instagram={instagram}
          logo={logo.url}
          menu={menu}
          copy={copyright}
        />
        <Lines />
      </body>
    </html>
  )
}

export default RootLayout
