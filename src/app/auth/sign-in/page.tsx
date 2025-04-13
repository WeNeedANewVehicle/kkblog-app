'use client'

import useSignInForm from '@/features/auth/hooks/useSignInForm'
import LogoutGuard from '@/components/Guard/LogoutGuard'
import Logo from '@/../public/icons/logo.svg'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import route from '@/routes/routes'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Password from '@/components/Input/Password/Password'

function Page() {
  const { register, onSubmit, errors, isPending, signInError } = useSignInForm()

  return (
    <LogoutGuard>
      <div className="flex flex-col self-center items-center justify-center flex-1 max-w-3xl w-full">
        <div className="flex flex-col self-center justify-center gap-8 w-full">
          <Link href={route.index} className="flex self-center">
            <Logo className="logo" width={200} height={'auto'} />
          </Link>

          <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <LabeledText required label="이메일">
              <Input
                {...register('email')}
                placeholder="example@email.com"
                className={`w-full ${errors.email && 'error-border'}`}
              />
              <ErrorMessage message={errors.email?.message} />
            </LabeledText>

            <LabeledText required label="비밀번호">
              <Password
                {...register('password')}
                placeholder="********"
                className="w-full"
              />
              <ErrorMessage message={errors.password?.message} />
            </LabeledText>

            <Button
              className="btn-black px-3 py-2.5 "
              type="submit"
              isLoading={isPending}
              disabled={isPending}
            >
              로그인
            </Button>

            <ErrorMessage message={signInError?.error?.message} />

            <div className="flex flex-col gap-4 pt-4">
              <Link href={route.auth.reset}>비밀번호가 기억나지 않습니다.</Link>
              <Link href={route.auth.signUp}>계정을 생성하고 싶습니다.</Link>
            </div>
          </form>
        </div>
      </div>
    </LogoutGuard>
  )
}

export default Page
