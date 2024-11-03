'use client'

import Link from 'next/link'
import route from '@/routes/routes'
import useSignInForm from '@/features/auth/hooks/useSignInForm'
import SignForm from '@/features/auth/components/SignForm'
import Password from '@/components/Password'
import Nbsp from '@/components/Nbsp'
import LogoutGuard from '@/components/Guard/LogoutGuard'
import Modal from '@/components/Modal/Modal'
import Loading from '@/components/Loading/Loading'
import SubmitButton from '@/components/SubmitButton/SubmitButton'

function Page() {
  const { register, onSubmit, errors, isPending } = useSignInForm()

  return (
    <LogoutGuard>
      <SignForm title="로그인" onSubmit={onSubmit}>
        <label className={'flex flex-col gap-2'}>
          <span>이메일</span>
          <input
            className={`sign-form-input ${errors.email ? 'border-warning' : ''}`}
            type="email"
            {...register('email')}
          />
          <div className={'error-message'}>
            {errors?.email?.message ?? <Nbsp />}
          </div>
        </label>

        <label className={`flex flex-col gap-2 `}>
          <span>비밀번호</span>
          <Password
            cssClass={`sign-form-input ${errors.password ? 'border-warning' : ' '}`}
            {...register('password')}
            className={'bg-dark-600 text-timberwolf '}
          />
          <div className="error-message">
            {errors?.password?.message ?? <Nbsp />}
          </div>
        </label>

        <SubmitButton isPending={isPending} />

        <div className="flex flex-col gap-4">
          <Link href={route.auth.reset} className="hover:underline">
            비밀번호 찾기
          </Link>

          <Link href={route.auth.signUp} className="hover:underline">
            회원 가입
          </Link>
        </div>
      </SignForm>
      <Modal />
    </LogoutGuard>
  )
}

export default Page
