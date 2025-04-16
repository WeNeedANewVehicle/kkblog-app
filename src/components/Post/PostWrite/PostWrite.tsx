import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import Input from '@/components/Input/Input'
import LabeledText from '@/components/Input/LabeledInput/LabeledInput'
import TagsInput from '@/components/Input/TagInput/TagInput'
import dynamic from 'next/dynamic'
import React, { BaseSyntheticEvent } from 'react'
import Loading from '@/../public/icons/loading.svg'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import route from '@/routes/routes'
import { UsePostFormReturn } from '@/features/posts/hooks/usePostForm'
import { ClassicEditor } from 'ckeditor5'

const DynamicWysiwygEditor = dynamic(
  () => import('@/components/WysiwygEditor/WysiwygEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col justify-center items-center gap-4 flex-1">
        <Loading width={75} height={75} />
        <div>에디터를 불러오는 중입니다.</div>
      </div>
    ),
  }
)

interface PostWriteProps
  extends Pick<
    UsePostFormReturn,
    'formState' | 'register' | 'tagFields' | 'onChangeEditor' | 'onChangeTag'
  > {
  onSubmit: (e: BaseSyntheticEvent) => void
  onReady?: (e: ClassicEditor) => void
}

function PostWrite({
  register,
  onSubmit,
  formState,
  tagFields,
  onChangeTag,
  onChangeEditor,
  onReady,
}: PostWriteProps) {
  return (
    <form className="flex flex-col flex-1 gap-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <LabeledText required label="제목" className="flex flex-col gap-1">
          <Input
            {...register('title')}
            placeholder="여기에 제목을 입력하세요"
          />
        </LabeledText>
        <ErrorMessage message={formState.errors.title?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <div>태그 ({tagFields.fields.length}/10)</div>
        <TagsInput
          //
          isEdit
          className="border-2"
          fields={tagFields.fields}
          remove={tagFields.remove}
          append={tagFields.append}
          maxLength={10}
          {...register('tagInput', {
            onChange: onChangeTag,
          })}
        />
        <ErrorMessage
          message={
            formState.errors.tagInput?.message ?? formState.errors.tags?.message
          }
        />
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <LabeledText required label="내용" />
        <DynamicWysiwygEditor onChange={onChangeEditor} onReady={onReady} />
        <ErrorMessage message={formState.errors.content?.message} />
      </div>

      <div className="flex gap-4">
        <Link
          className="flex items-center bg-gray-100 color-gray-200 px-3 py-2.5"
          href={route.posts.index}
        >
          돌아가기
        </Link>
        <Button className="px-3 py-2.5">임시 저장</Button>
        <Button
          type="submit"
          className="btn-black px-3 py-2.5"
          disabled={formState.isLoading || formState.isSubmitting}
        >
          작성
        </Button>
      </div>
    </form>
  )
}

export default PostWrite
