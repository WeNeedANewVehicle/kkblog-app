import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { PostSchema, postSchema } from '@/features/posts/schema/post.schema'
import { stripHtmlTags } from '@/common/regexps/regexps'
import { WysiwygEditorProps } from '@/components/WysiwygEditor/WysiwygEditor'
import { ChangeEvent, useCallback } from 'react'

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
    clearErrors,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
      desc: '',
      files: [],
      tagInput: '',
      tags: [],
      title: '',
      id: undefined,
    },
    mode: 'all',
  })

  const tagFields = useFieldArray({
    control,
    name: 'tags',
  })

  const fileFields = useFieldArray({
    control,
    name: 'files',
  })

  const onChangeEditor: WysiwygEditorProps['onChange'] = useCallback(
    (_, editor) => {
      setValue('content', editor.getData())
    },
    [setValue]
  )

  const onChangeTag = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value

      const pureValue = value.replaceAll(',', '')
      const isExist = tagFields.fields.find((tag) => tag.label === pureValue)

      if (isExist) {
        setError('tags', { message: '같은 이름의 태그가 존재합니다.' })
        setError('tagInput', { message: '같은 이름의 태그가 존재합니다.' })
        return
      }

      const isEmpty = value.trim() === '' || pureValue === ''

      if (!isEmpty && value.endsWith(',')) {
        clearErrors('tags')
        tagFields.append({
          label: pureValue,
          id: undefined,
        })
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
  }
}

export default usePostForm
