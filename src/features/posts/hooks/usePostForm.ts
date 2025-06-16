import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { PostSchema, postSchema } from '@/features/posts/schema/post.schema'
import { WysiwygEditorProps } from '@/components/WysiwygEditor/WysiwygEditor'
import { ChangeEvent, useCallback } from 'react'

const initialValue = {
  content: '',
  desc: '',
  files: [],
  tagInput: '',
  tags: [],
  title: '',
  id: undefined,
  isPublished: true
}

export type UsePostFormReturn = ReturnType<typeof usePostForm>
function usePostForm() {
  const {
    control,
    formState,
    handleSubmit,
    register,
    setValue,
    setFocus,
    watch,
    getValues,
    setError,
    reset,
    clearErrors,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValue,
    mode: 'all',
  })

  const tagFields = useFieldArray({ control, name: 'tags' })
  const fileFields = useFieldArray({ control, name: 'files' })

  const onChangeEditor: WysiwygEditorProps['onChange'] = useCallback(
    (_, editor) => {
      setValue('content', editor.getData())
    },
    [setValue]
  )

  const onChangeTag = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value

      // 콤마를 모두 빈 문자열로 치환해 태그 필드에 입력한 문자열 값만 가져와 태그 목록에서 중복된 태그인지 검사
      const pureValue = value.replaceAll(',', '')
      const isExist = tagFields.fields.find((tag) => tag.label === pureValue)

      if (isExist) {
        setError('tags', { message: '같은 이름의 태그가 존재합니다.' })
        setError('tagInput', { message: '같은 이름의 태그가 존재합니다.' })
        return
      }

      // 빈 문자열인지 검사 후 아닐 경우에만 목록에 추가
      const isEmpty = value.trim() === '' || pureValue === ''

      if (!isEmpty && value.endsWith(',')) {
        clearErrors('tags')
        tagFields.append({ label: pureValue, id: undefined })

        // 입력 필드 초기화
        e.target.value = ''
      }
    },
    [tagFields, setError, clearErrors]
  )

  return {
    formState,
    onChangeEditor,
    onChangeTag,
    handleSubmit,
    register,
    tagFields,
    fileFields,
    setValue,
    setFocus,
    getValues,
    watch,
    reset,
  }
}

export default usePostForm
