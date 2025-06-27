import React, { ChangeEvent, useCallback } from 'react'
import ConfirmModal, { ConfirmModalProps } from '@/components/Modal/ConfirmModal/ConfirmModal'
import { GetMyPostsItemResponseDto } from '@/features/posts/api/dto/getMyPosts.dto'
import TempPostModalItem from './TempPostModalItem'
import useBrowserConfirm from '@/common/hooks/useBrowserConfirm'
import route from '@/routes/routes'
import { useRouter } from 'next/navigation'

export interface TempPostModalProps extends Omit<ConfirmModalProps, 'onConfirm'> {
  onClose: () => void
  tempPosts: GetMyPostsItemResponseDto[]
  onChangeRadio: (e: ChangeEvent<HTMLInputElement>) => void
  selectedTempPost: GetMyPostsItemResponseDto | undefined
}

function TempPostModal({ 
  isOpen, 
  onClose,  
  tempPosts, 
  onChangeRadio,
  selectedTempPost,
}: TempPostModalProps) {

  const router = useRouter();
  const openConfirm = useBrowserConfirm();
  const onConfirm = useCallback(() => {
    if (selectedTempPost) {
      openConfirm('지금까지 작성한 내용을 모두 잃게됩니다. 정말 임시글을 불러오시겠습니까?', () => {
        onClose();
        router.push(route.posts.edit(selectedTempPost.id))
      })
    }
  }, [openConfirm, selectedTempPost, onClose]);

  return (
    <ConfirmModal 
      title={'임시작성 글 불러오기'}
      confirmText='선택'
      cancelText='취소'
      className='max-h-[100dvh]'
      onClose={onClose}
      onConfirm={onConfirm} 
      isOpen={isOpen}
      isConfirmDisabled={!Boolean(selectedTempPost)}
    >
      <p>
        아직 작성되지 않은 글 목록을 불러옵니다.
      </p>
      <ul className="flex flex-col gap-2 overflow-y-scroll">
        {tempPosts.map(post => <TempPostModalItem key={post.id} {...post} onChange={onChangeRadio}/>)}
      </ul>  
    </ConfirmModal>
  )
}

export default TempPostModal
