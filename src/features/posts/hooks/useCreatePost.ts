import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPostApi } from '@/features/posts/api/posts'
import route from '@/routes/routes'
import { useRouter } from 'next/navigation'
import { GET_INFINITE_POSTS } from '@/features/posts/hooks/useInfiniteGetPosts'
import { GET_MY_POSTS } from '@/features/posts/hooks/useGetMyPosts'
import { GetMyPostsItemResponseDto } from '../api/dto/getMyPosts.dto'
import { BaseResponse } from '@/common/dto/baseResponse'

const CREATE_POST = 'CREATE_POST'

function useCreatePost() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [CREATE_POST],
    mutationFn: createPostApi,
    onSuccess: (res, { isPublished, title }) => {

      // 글 등록 후 글 목록을 갱신
      if (isPublished) {
        queryClient.invalidateQueries({
          queryKey: [GET_INFINITE_POSTS],
        })
        router.replace(route.posts.detail(res.data.id))
        return;
      }

      // 임시글을 등록한 경우, 낙관적 업데이트를 이용해 임시글 데이터 갱신
      queryClient.setQueryData<BaseResponse<GetMyPostsItemResponseDto[]>>(
        [GET_MY_POSTS],
        (oldData) => {
          if (!oldData) {
            return;
          }

          const { data } = res;
          const { id } = data;
          return {
            ...oldData,
            data: [{ id, title, createdAt: new Date().toISOString() }].concat(oldData.data)
          }
        }
      )
    }
  })
}

export default useCreatePost

