import { useMutation, useQuery } from '@tanstack/react-query'
import { signUpApi } from '../../api/auth'
import { SignUpSchema } from '../../schema/signUpSchema'
import { UseFormSetError } from 'react-hook-form'
import { ErrorBaseResponse } from '@/common/dto/base-response.dto'
import { ErrorMessage, HttpStatus } from '@/common/constant/constant'

export const SIGN_UP = 'SIGN_UP'

interface UseSignUpParams {
  setError: UseFormSetError<SignUpSchema>
}

function useSignUp({ setError }: UseSignUpParams) {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log('onSuccess', data)
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
