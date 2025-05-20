import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePostApi } from '@/features/posts/api/posts'
import { UpdatePostDto } from '@/features/posts/api/dto/updatePost.dto'
import { useRouter } from 'next/navigation'
import route from '@/routes/routes'
import { errorMessages } from '@/common/messages/error.messages'

const UPDATE_POST = 'UPDATE_POST'

function useUpdatePost(id: string) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [UPDATE_POST, id],
    mutationFn: (params: UpdatePostDto) => updatePostApi(id, params),
    onSuccess: () => {
      router.replace(route.posts.detail(id))
    },
    onError: () => {
      alert(errorMessages.posts.update_failed)
    },
  })
}

export default useUpdatePost
