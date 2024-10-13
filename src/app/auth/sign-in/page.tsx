'use client'

import Link from 'next/link'
import route from '@/routes/routes'
import useSignInForm from '@/features/auth/hooks/useSignInForm'
import SignForm from '@/features/auth/components/SignForm'
import Password from '@/components/Password'
import Nbsp from '@/components/Nbsp'
import LogoutGuard from '@/components/Guard/LogoutGuard'

function Page() {
  const { register, onSubmit, handleSubmit, errors } = useSignInForm()

  return (
    <LogoutGuard>
      <SignForm title="로그인" onSubmit={handleSubmit(onSubmit)}>
        <label className={'flex flex-col gap-2'}>
          <span>이메일</span>
          <input
            className={`sign-form-input ${errors.email ? 'invalid-input' : ''}`}
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
            cssClass={`sign-form-input ${errors.password ? 'invalid-input' : ' '}`}
            {...register('password')}
          />
          <div className="error-message">
            {errors?.password?.message ?? <Nbsp />}
          </div>
        </label>

        <input
          type="submit"
          className={'sign-form-input bg-white text-gray-800 my-4'}
          value="로그인"
        />

        <div className="flex flex-col gap-4">
          <Link href={route.auth.reset}>비밀번호 찾기</Link>

          <Link href={route.auth.signUp}>회원 가입</Link>
        </div>
      </SignForm>
    </LogoutGuard>
  )
}

export default Page
