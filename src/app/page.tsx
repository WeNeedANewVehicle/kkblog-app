import route from '@/routes/routes'
import Link from 'next/link'

function Page() {
  return (
    <div className={'pt-[50px]'}>
      <Link href={route.auth.signIn}>로그인</Link>
      <Link href={route.auth.signUp}>가입</Link>
    </div>
  )
}

export default Page
