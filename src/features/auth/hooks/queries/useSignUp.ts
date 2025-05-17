'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { signUpApi } from '../../api/auth'
import { SignUpSchema } from '../../schema/signUpSchema'
import { UseFormSetError } from 'react-hook-form'
import { ErrorMessage } from '@/common/enum/error-messages'
import redirectStorage from '@/common/storages/redirect-storage'
import { useRouter } from 'next/navigation'

export const SIGN_UP = 'SIGN_UP'

interface UseSignUpParams {
  setError: UseFormSetError<SignUpSchema>
}

function useSignUp({ setError }: UseSignUpParams) {
  const router = useRouter()

  return useMutation({
    retry: false,
    mutationFn: signUpApi,
    onSuccess: (_) => {
      const redirectUrl = redirectStorage.getRedirectUrl()

      if (redirectUrl) {
        router.replace(redirectUrl)
      }
    },
    onError: ({ error, meta }) => {
      switch (meta?.code) {
        case ErrorMessage.EMAIL_CONFLICT:
          setError('email', { message: error.message })
          break
        case ErrorMessage.NICKNAME_CONFLICT:
          setError('nickname', { message: error.message })
          break
        default:
          alert('error')
      }
    },
  })
}

export default useSignUp
