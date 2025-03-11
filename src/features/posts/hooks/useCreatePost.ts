import { useMutation } from '@tanstack/react-query'
import { createPostApi } from '@/features/posts/api/posts'

const CREATE_POST = 'CREATE_POST'

function useCreatePost() {
  return useMutation({
    mutationKey: [CREATE_POST],
    mutationFn: createPostApi,
    onSuccess: (res) => {
      console.log('post created', res)
    },
  })
}

export default useCreatePost
