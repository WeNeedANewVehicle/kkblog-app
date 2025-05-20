'use client'
import { kia } from '@/theme/font'
import Providers from '@/components/Providers/Providers'
import Header from '@/components/Header/Header'
import { menu } from '@/components/Header/data/header.data'
import { hideGnbPaths } from '@/common/constant/constant'
import ModalContainer from '@/components/Modal/ModalContainer'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import './globals.css'
import Footer from '@/components/Footer/Footer'
import AuthUserGlobalEffect from '@/features/effects/AuthUserGlobalEffect'
import { useMemo } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isHideGnb = useMemo(
    () => hideGnbPaths.find((path) => pathname.startsWith(path)),
    [pathname]
  )

  return (
    <html lang="en">
      <Head>
        <title>크크블로그</title>
        <meta name="description" content="안녕하세요. 크크블로그입니다." />
      </Head>

      <body className={kia.className}>
        <Providers>
          <AuthUserGlobalEffect>
            {!isHideGnb && <Header menu={menu} />}
            <main id="main">{children}</main>
            <ModalContainer />
          </AuthUserGlobalEffect>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
