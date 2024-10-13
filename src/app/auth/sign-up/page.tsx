'use client'

import Password from '@/components/Password'
import SignForm from '@/features/auth/components/SignForm'
import useSignUpForm from '@/features/auth/hooks/useSignUpForm'

function Page() {
  const { onSubmit, register } = useSignUpForm()
  return (
    <SignForm title="회원 가입" onSubmit={onSubmit}>
      <label className={'flex flex-col gap-2'}>
        <span>이메일</span>
        <input
          className={`sign-form-input`}
          type="email"
          {...register('email')}
        />
      </label>

      <label className={'flex flex-col gap-2'}>
        <span>닉네임</span>
        <input className={`sign-form-input`} {...register('nickname')} />
      </label>

      <label className={'flex flex-col gap-2'}>
        <span>비밀번호</span>
        <Password className={`sign-form-input`} {...register('password')} />
      </label>

      <label className={'flex flex-col gap-2'}>
        <span>비밀번호 검증</span>
        <Password className={`sign-form-input`} {...register('confirm')} />
      </label>

      <button
        type="submit"
        className={'bg-white text-gray-800 my-4 p-2'}
        // onClick={onHandleSignIn}
      >
        회원 가입
      </button>
    </SignForm>
  )
}

export default Page
