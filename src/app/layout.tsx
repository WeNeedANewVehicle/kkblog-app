'use client'
import { kia } from '@/theme/font'
import Providers from '@/components/Providers/Providers'
import GNB from '@/components/GNB/GNB'
import { menu } from '@/components/GNB/data/GNB.data'
import { hideGnbPaths } from '@/common/constant/constant'
import ModalContainer from '@/components/Modal/ModalContainer'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isHideGnb = hideGnbPaths.find((path) => pathname.startsWith(path))

  return (
    <html lang="en">
      <Head>
        <title>크크블로그</title>
      </Head>

      <body className={kia.className}>
        <Providers>
          {!isHideGnb && <GNB menu={menu} />}
          <main id="main">{children}</main>
          <ModalContainer />
        </Providers>
      </body>
    </html>
  )
}
