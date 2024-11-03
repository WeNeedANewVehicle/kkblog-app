import type { Metadata } from 'next'
import { kia } from '@/theme/font'
import './globals.css'
import Provider from '@/components/Providers/Provider'
import GNB from '@/components/GNB/GNB'
import { menu } from '@/components/GNB/data/GNB.data'

export const metadata: Metadata = {
  title: 'KKBlog - 크크블로그',
  description: '안녕하세요. 크크블로그입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${kia.className} w-full min-h-screen`}>
          <GNB menu={menu} />
          <main className={'pt-[50px] px-4 h-full'}>{children}</main>
        </body>
      </Provider>
    </html>
  )
}
