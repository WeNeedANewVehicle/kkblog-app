'use client'

import Button from '@/components/Button/Button'
import LogoutGuard from '@/components/Guard/LogoutGuard'
import Input from '@/components/Input/Input'
import LabeledInput from '@/components/Input/LabeledInput/LabeledInput'
import Password from '@/components/Input/Password/Password'
import useSignUpForm from '@/features/auth/hooks/useSignUpForm'

function Page() {
  const { onSubmit, register, isValid, errors, loading } = useSignUpForm()

  return (
    <LogoutGuard>
      <div className="center-layout gap-8">
        <h2 className="text-5xl md:text-8xl font-bold">회원가입</h2>
        <form
          className="flex-column self-center justify-center gap-2 md:gap-4 md:text-2xl"
          onSubmit={onSubmit}
        >
          <LabeledInput required label={'이메일'}>
            <Input
              type="email"
              {...register('email')}
              className={`input-md border ${errors.email ? 'error-border' : 'border-dark-600'}`}
            />
            <div className="h-4 error-text">{errors.email?.message}</div>
          </LabeledInput>

          <LabeledInput required label="닉네임">
            <Input
              {...register('nickname')}
              className={`input-md border ${errors.nickname ? 'error-border' : 'border-dark-600'}`}
            />
            <div className="h-4 error-text">{errors.nickname?.message}</div>
          </LabeledInput>

          <LabeledInput required label="비밀번호">
            <Password
              className={`input-md border ${errors.password ? 'error-border' : 'border-dark-600'}`}
              {...register('password')}
            />
            <div className="h-4 error-text">{errors.password?.message}</div>
          </LabeledInput>

          <LabeledInput required label="비밀번호 검증">
            <Password
              className={`input-md border ${errors.confirm ? 'error-border' : 'border-dark-600'}`}
              {...register('confirm')}
            />
            <div className="h-4 error-text">{errors.confirm?.message}</div>
          </LabeledInput>

          <div />
          <Button
            //
            type="submit"
            className={''}
            disabled={!isValid}
            isLoading={loading}
          >
            제출
          </Button>
        </form>
      </div>
    </LogoutGuard>
  )
}

export default Page
