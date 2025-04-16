import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePostApi } from '@/features/posts/api/posts'
import { UpdatePostDto } from '@/features/posts/api/dto/updatePost.dto'
import { useRouter } from 'next/navigation'
import route from '@/routes/routes'
import { GET_POST } from './useGetPost'

const UPDATE_POST = 'UPDATE_POST'

function useUpdatePost(id: string) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [UPDATE_POST, id],
    mutationFn: (params: UpdatePostDto) => updatePostApi(id, params),
    onSuccess: () => {
      // Invalidate the post query to refetch updated data
      queryClient.invalidateQueries({ queryKey: [GET_POST, id] })
      // Navigate back to the post detail page
      router.replace(route.posts.detail(id))
    },
  })
}

export default useUpdatePost
