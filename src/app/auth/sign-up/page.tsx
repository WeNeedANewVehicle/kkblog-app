'use client'

import Button from '@/components/Button/Button'
import LogoutGuard from '@/components/Guard/LogoutGuard'
import Input from '@/components/Input/Input'
import LabeledInput from '@/components/Input/LabeledInput/LabeledInput'
import Password from '@/components/Input/Password/Password'
import useSignUpForm from '@/features/auth/hooks/useSignUpForm'
import route from '@/routes/routes'
import Link from 'next/link'
import Logo from '@/../public/icons/logo.svg'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

function Page() {
  const { onSubmit, register, errors, loading } = useSignUpForm()

  return (
    <LogoutGuard>
      <div className="flex flex-col self-center justify-center flex-auto gap-5 max-w-3xl w-full">
        <Link href={route.index} className="flex self-center">
          <Logo className="logo-lg" width={100} />
        </Link>
        <form
          className="flex flex-col self-center justify-center gap-2 w-full"
          onSubmit={onSubmit}
        >
          <LabeledInput required label={'이메일'}>
            <Input
              type="email"
              {...register('email')}
              placeholder="example@email.com"
              className={`input-md border ${errors.email ? 'error-border' : 'border-dark-600'}`}
            />
            <ErrorMessage message={errors.email?.message} />
          </LabeledInput>

          <LabeledInput required label="닉네임">
            <Input
              {...register('nickname')}
              placeholder="크크블로그"
              className={`input-md border ${errors.nickname ? 'error-border' : 'border-dark-600'}`}
            />
            <ErrorMessage message={errors.nickname?.message} />
          </LabeledInput>

          <LabeledInput required label="비밀번호">
            <Password
              className={`input-md border ${errors.password ? 'error-border' : 'border-dark-600'}`}
              {...register('password')}
              placeholder="********"
            />
            <ErrorMessage message={errors.password?.message} />
          </LabeledInput>

          <LabeledInput required label="비밀번호 검증">
            <Password
              className={`input-md border ${errors.confirm ? 'error-border' : 'border-dark-600'}`}
              {...register('confirm')}
              placeholder="********"
            />
            <ErrorMessage message={errors.confirm?.message} />
          </LabeledInput>

          <div />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="btn-black box-sm w-full"
              disabled={loading}
              isLoading={loading}
            >
              제출
            </Button>
            <Link
              href={route.index}
              className="flex items-center justify-center btn-black box-sm w-full"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </LogoutGuard>
  )
}

export default Page
