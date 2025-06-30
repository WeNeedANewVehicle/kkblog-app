import useModal from '@/components/Modal/hooks/useModal'
import TempPostModal, {
  TempPostModalProps,
} from '@/components/Modal/TempPostModal/TempPostModal'
import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import useGetMyPosts from '@/features/posts/hooks/useGetMyPosts'
import { GetMyPostsItemResponseDto } from '../api/dto/getMyPosts.dto'

function useLoadTempPosts() {
  const { data: tempPosts } = useGetMyPosts({ published: false })
  const {
    open: openTempPostModal,
    close: closeTempPostModal,
    update: updateTempPostModalProps,
  } = useModal(TempPostModal)

  const [selectedTempPost, setSelectedTempPost] =
    useState<GetMyPostsItemResponseDto>()

  // 라디오 버튼 클릭 시 발생하는 이벤트
  const onChangeRadio = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const post = tempPosts?.data.find((post) => post.id === e.target.value)
      if (!post) return

      setSelectedTempPost(post)
      updateTempPostModalProps({ ...props, selectedTempPost: post })
    },
    [tempPosts, setSelectedTempPost, selectedTempPost, updateTempPostModalProps]
  )

  const props = useMemo<TempPostModalProps>(
    () => ({
      isConfirmDisabled: selectedTempPost ? false : true,
      onClose: () => closeTempPostModal(),
      onChangeRadio,
      selectedTempPost,
      isOpen: true,
      tempPosts: tempPosts?.data ?? [],
    }),
    [tempPosts, selectedTempPost]
  )

  const onOpenTempPostModal = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault()
      openTempPostModal({ ...props, selectedTempPost })
    },
    [
      openTempPostModal,
      closeTempPostModal,
      onChangeRadio,
      tempPosts,
      selectedTempPost,
      props,
    ]
  )

  return {
    onOpenTempPostModal,
    tempPosts,
  }
}

export default useLoadTempPosts
