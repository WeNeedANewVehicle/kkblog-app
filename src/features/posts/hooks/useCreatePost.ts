import { useMutation } from '@tanstack/react-query'
import { createPostApi } from '@/features/posts/api/posts'
import route from '@/routes/routes'
import { useRouter } from 'next/navigation'

const CREATE_POST = 'CREATE_POST'

function useCreatePost() {
  const router = useRouter()

  return useMutation({
    mutationKey: [CREATE_POST],
    mutationFn: createPostApi,
    onSuccess: (res) => {
      router.replace(route.posts.detail(res.data.id))
    },
  })
}

export default useCreatePost
