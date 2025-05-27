import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPostApi } from '@/features/posts/api/posts'
import route from '@/routes/routes'
import { useRouter } from 'next/navigation'
import { GET_INFINITE_POSTS } from './useInfiniteGetPosts'

const CREATE_POST = 'CREATE_POST'

function useCreatePost() {
  const router = useRouter()
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CREATE_POST],
    mutationFn: createPostApi,
    onSuccess: (res) => {
      // 글 등록 후 글 목록을 갱신
      queryClient.invalidateQueries({
        queryKey: [GET_INFINITE_POSTS]
      })
      router.replace(route.posts.detail(res.data.id))

    },
  })
}

export default useCreatePost
