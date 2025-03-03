'use client'

import useSignInForm from '@/features/auth/hooks/useSignInForm'
import LogoutGuard from '@/components/Guard/LogoutGuard'

function Page() {
  const { register, onSubmit, errors, isPending } = useSignInForm()

  return <LogoutGuard>sign in</LogoutGuard>
}

export default Page
