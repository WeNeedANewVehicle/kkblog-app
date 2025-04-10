import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useSignIn from './queries/useSignIn'
import { signInSchema, SignInSchema } from '../schema/signInSchema'

const defaultValues = {
  email: '',
  password: '',
}

function useSignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  })

  const { mutate: signIn, isPending: isSignInPending, data, error: signInError } = useSignIn()

  const { errors } = formState

  const onSubmit = useCallback(
    async ({ email, password }: SignInSchema) => {
      signIn({ email, password })
    },
    [signIn]
  )

  const isPending = useMemo(() => isSignInPending, [isSignInPending])

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
    data,
    signInError,
  }
}

export default useSignInForm
