import React from 'react'
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
      <body className={clsx(rubik.variable, montserrat.variable)}>
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
