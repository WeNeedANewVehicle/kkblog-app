import useSignUp from './queries/useSignUp'
import { useForm } from 'react-hook-form'
import { SignUpSchema, signUpSchema } from '../schema/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'

const defaultValues = {
  email: '',
  nickname: '',
  password: '',
  confirm: '',
}

function useSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading, isSubmitting },
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  })

  const {
    mutateAsync: signUp,
    error,
    isPending,
  } = useSignUp({
    setError,
  })

  const onSubmit = handleSubmit(async (values) => {
    await signUp(values)
  })

  const loading = useMemo(
    () => isLoading || isSubmitting || isPending,
    [isLoading, isSubmitting, isPending]
  )

  return {
    onSubmit,
    register,
    isValid,
    errors,
    loading,
  }
}

export default useSignUpForm
