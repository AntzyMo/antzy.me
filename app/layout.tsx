import TransDark from '@/components/TransDark'
import BackToTop from '@/components/BackToTop'

import '@/styles/globals.css'
import { ThemeProviders } from '@/providers'

export const metadata = {
  title: 'Antzy Mo',
  description: 'AntzyMo的个人网站，挖掘生活中的美好，记录代码生活',
  openGraph: {
    title: 'Antzy Mo',
    description: 'AntzyMo的个人网站，挖掘生活中的美好，记录代码生活',
    locale: 'zh_CN',
    creator: 'AntzyMo'
  },
  icons: [
    {
      rel: 'icon',
      url: '/logo.svg',
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: light)'
    },
    {
      rel: 'icon',
      url: '/logo-dark.svg',
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: dark)'
    }
  ]
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          <TransDark/>
          { children }
        </ThemeProviders>
        <BackToTop/>
      </body>
    </html>
  )
}
