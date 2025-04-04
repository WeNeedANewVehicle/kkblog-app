'use client'
import { kia } from '@/theme/font'
import './globals.css'
import Providers from '@/components/Providers/Providers'
import GNB from '@/components/GNB/GNB'
import { menu } from '@/components/GNB/data/GNB.data'
import { usePathname } from 'next/navigation'
import { hideGnbPaths } from '@/common/constant/constant'
import Head from 'next/head'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isHideGnb = hideGnbPaths.find((path) => pathname.startsWith(path));
  
  return (
    <html lang="en">
      <Head>
        <title>크크블로그</title>
      </Head>

      <body className={kia.className}>
        <Providers>
          {!isHideGnb && <GNB menu={menu} />}
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
