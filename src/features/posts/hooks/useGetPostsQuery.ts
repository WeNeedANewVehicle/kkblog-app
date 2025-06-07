import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  PostSearchSchema,
  postSearchSchema,
} from '@/features/posts/schema/postSearch.schema'
import { useRouter, useSearchParams } from 'next/navigation'
import { messages } from '@/common/messages/messages'
import route from '@/routes/routes'
import { useCallback } from 'react'

function useGetPostsQuery() {
  const router = useRouter()
  const params = useSearchParams()
  const search = params.get('search')

  const { formState, resetField, register, handleSubmit, setError, watch } =
    useForm<PostSearchSchema>({
      resolver: zodResolver(postSearchSchema),
      defaultValues: {
        search,
      },
    })

  const onSubmit = handleSubmit(({ search }) => {
    if (!search) {
      return setError('search', {
        message: messages.validation.posts.min_length,
      })
    }

    if (search.length < 2) {
      return setError('search', {
        message: messages.validation.posts.min_length,
      })
    }

    router.replace(`${route.posts.index}?search=${search}`, {
      scroll: false,
    })
  })

  const onClear = useCallback(() => {
    router.replace(route.posts.index, { scroll: false })
    resetField('search', {
      defaultValue: null,
      keepError: false,
    })
  }, [resetField, router])

  return { formState, register, onSubmit, onClear, search, watch }
}

export default useGetPostsQuery
