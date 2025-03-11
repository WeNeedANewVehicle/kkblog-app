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
import styles from '@/app/auth/sign-in/sign-in.module.css'
import Password from '@/components/Input/Password/Password'

function Page() {
  const { register, onSubmit, errors, isPending } = useSignInForm()

  return (
    <LogoutGuard>
      <div className={`flex self-center margin-auto ${styles.wrapper}`}>
        <div className={`flex flex-column gap-2 ${styles.inner}`}>
          <Link
            href={route.index}
            className={`flex self-center ${styles.link}`}
          >
            <Logo className="logo-lg" width={100} />
          </Link>

          <form className="flex flex-column gap-1" onSubmit={onSubmit}>
            <LabeledText label="이메일">
              <Input inputSize="md" {...register('email')} />
              <ErrorMessage message={errors.email?.message} />
            </LabeledText>

            <LabeledText label="비밀번호">
              <Password inputSize="md" {...register('password')} />
              <ErrorMessage message={errors.password?.message} />
            </LabeledText>

            <div />

            <Button
              type="submit"
              size="md"
              className="button-md"
              isLoading={isPending}
            >
              로그인
            </Button>

            <Link href={route.auth.reset}>비밀번호가 기억나지 않습니다.</Link>
          </form>
        </div>
      </div>
    </LogoutGuard>
  )
}

export default Page
