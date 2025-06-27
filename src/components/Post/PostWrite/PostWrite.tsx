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
import { WysiwygEditorProps } from '@/components/WysiwygEditor/WysiwygEditor'

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

type PostWriteForm = Pick<
  UsePostFormReturn,
  'formState' | 'register' | 'tagFields' | 'onChangeTag'
>

type PostWriteProps = PostWriteForm &
  WysiwygEditorProps & {
    onSubmit: (e: BaseSyntheticEvent) => void
    onSaveTemp: () => void
    tempPostCount: number
    onOpenTempPostModal: (e: BaseSyntheticEvent) => void
  }

function PostWrite({
  register,
  onSubmit,
  formState,
  tagFields,
  onChangeTag,
  onChange,
  onReady,
  onSaveTemp,
  onOpenTempPostModal,
  data,
  tempPostCount,
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
        <DynamicWysiwygEditor
          onChange={onChange}
          onReady={onReady}
          data={data}
        />
        <ErrorMessage message={formState.errors.content?.message} />
      </div>

      <div className="flex justify-between max-md:flex-col">
        <div className="flex gap-2">
          <Button
            className="text-gray-600 hover:bg-gray-200 box-sm"
            onClick={onSaveTemp}
          >
            임시저장
          </Button>
          <Button
            className={`text-gray-600 hover:bg-gray-200 box-sm ${!tempPostCount && 'line-through'}`}
            onClick={onOpenTempPostModal}
            disabled={tempPostCount <= 0}
          >
            불러오기 ({tempPostCount})
          </Button>
        </div>

        <div className="flex gap-2">
          <Link
            className="flex items-center color-gray-200 hover:bg-burgundy-100 text-red-600 box-sm"
            href={route.posts.index}
          >
            돌아가기
          </Link>

          <Button
            type="submit"
            className="text-black dark:text-white dark:hover:bg-black hover:bg-gray-200 box-sm"
            disabled={formState.isLoading || formState.isSubmitting}
          >
            작성
          </Button>
        </div>
      </div>
    </form>
  )
}

export default PostWrite
