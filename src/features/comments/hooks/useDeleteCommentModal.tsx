import ConfirmModal from '@/components/Modal/ConfirmModal/ConfirmModal'
import useModal from '@/components/Modal/hooks/useModal'
import React, { useCallback } from 'react'
import useDeleteComment from './useDeleteComment'
import { DeleteCommentDto } from '../api/dto/deleteComment.dto'

function useDeleteCommentModal() {
  const { open, close } = useModal(ConfirmModal)
  const { mutateAsync: deleteComment } = useDeleteComment()

  const onOpenDeleteCommentModal = useCallback(
    ({ id, postId, parentCommentId }: DeleteCommentDto) => {
      open({
        isOpen: true,
        onClose: close,
        onConfirm: () =>
          deleteComment(
            { id, postId, parentCommentId },
            { onSuccess: () => close() }
          ),
        title: '알림',
        children: <div>댓글을 삭제하시겠습니까?</div>,
      })
    },
    [close, deleteComment, open]
  )

  return {
    onOpenDeleteCommentModal,
  }
}

export default useDeleteCommentModal
