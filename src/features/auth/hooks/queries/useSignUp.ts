import { useMutation, useQuery } from '@tanstack/react-query'
import { signUpApi } from '../../api/auth'

export const SIGN_UP = 'SIGN_UP'

function useSignUp() {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log('login success', data)
    },
  })
}

export default useSignUp
