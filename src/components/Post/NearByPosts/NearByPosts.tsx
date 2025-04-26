'use client'

import useNearbyPosts from '@/features/posts/hooks/useNearbyPosts'
import React, { useCallback, useMemo, MouseEvent } from 'react'
import LogoIcon from '@/../public/icons/logo.svg'
import Link from 'next/link'
import route from '@/routes/routes'
import Image from 'next/image'
import { GetPostsItemResponseDto } from '@/features/posts/api/dto/get-post-list.dto'

interface NearByPostsProps {
  postId: string
}

interface NearByPostProps {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  post?: GetPostsItemResponseDto
  type: 'prev' | 'next'
}

function NearByPostMobile({ onClick, post, type }: NearByPostProps) {
  const text = useMemo(() => (type === 'next' ? '다음 글' : '이전 글'), [type])

  const hasThumbnail = post?.thumbnail
  const alt = `${text} ${post?.title!}의 썸네일이 보입니다.`
  const title = post ? post.title : `${text}이 없습니다.`
  return (
    <li className="flex flex-1 min-w-0 max-w-full ">
      <Link
        //
        onClick={onClick}
        className="pointer relative flex flex-1 p-4 items-center gap-4 bg-gray-200 dark:bg-gray-700 md:hidden overflow-hidden"
        href={route.posts.detail(post?.id!)}
      >
        <div className="relative flex aspect-square size-16 md:hidden">
          {hasThumbnail && (
            <Image
              className="object-cover "
              src={post.thumbnail!}
              fill
              alt={alt}
            />
          )}
          {!hasThumbnail && (
            <LogoIcon className="border-2 p-2 size-full [&>path]:fill-dark-700 [&>path]:stroke-dark-700 [&>path]:dark:fill-white [&>path]:dark:stroke-white" />
          )}
        </div>
        <div className="flex flex-col flex-1 h-16 justify-between overflow-hidden">
          <h4 className="flex gap-2"> {text}</h4>
          <h4 className="font-black text-ellipsis overflow-hidden whitespace-nowrap max-w-full">
            {title}
          </h4>
        </div>
      </Link>
    </li>
  )
}

function NearByPost({ onClick, post, type }: NearByPostProps) {
  const text = useMemo(() => (type === 'next' ? '다음 글' : '이전 글'), [type])

  const hasThumbnail = post?.thumbnail
  const alt = `${text} ${post?.title!}의 썸네일이 보입니다.`
  const title = post ? post.title : `${text}이 없습니다.`

  return (
    <li className="flex flex-1 max-w-full overflow-hidden">
      <Link
        className="pointer relative flex flex-1 items-center justify-center aspect-[21/9] max-md:hidden bg-gray-200 dark:bg-gray-700 hover:animate-blink-bg"
        onClick={onClick}
        href={route.posts.detail(post?.id!)}
      >
        {hasThumbnail && (
          <Image
            //
            className="object-cover max-md:hidden opacity-40 "
            fill
            src={post.thumbnail!}
            alt={alt}
          />
        )}
        {!hasThumbnail && (
          <LogoIcon
            //
            className="max-md:hidden z-10 flex self-center opacity-40  "
            width={200}
            height={50}
          />
        )}
        <div className="absolute bottom-8 flex flex-col px-4 gap-2 z-20 overflow-hidden w-full">
          <h4> {text}</h4>
          <h4 className="text-3xl text-ellipsis overflow-hidden whitespace-nowrap max-w-[600px]">
            {title}
          </h4>
        </div>
      </Link>
    </li>
  )
}

function NearByPosts({ postId }: NearByPostsProps) {
  const { data } = useNearbyPosts(postId)

  const prev = useMemo(() => data?.data.prev, [data?.data.prev])
  const next = useMemo(() => data?.data.next, [data?.data.next])

  const preventNoPrevPostRedirect = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!prev?.id) {
        e.preventDefault()
        alert('이전 글이 없습니다.')
        return
      }

      return
    },
    [prev]
  )

  const preventNoNextPostRedirect = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!next?.id) {
        e.preventDefault()
        alert('다음 글이 없습니다.')
        return
      }
    },
    [next]
  )

  return (
    <>
      {/** tablet ~ */}
      <ul className="flex flex-row gap-4 max-md:hidden">
        <NearByPost
          post={prev}
          onClick={preventNoPrevPostRedirect}
          type={'prev'}
        />
        <NearByPost
          post={next}
          onClick={preventNoNextPostRedirect}
          type={'next'}
        />
      </ul>

      {/** ~ tablet */}
      <ul className="flex flex-col gap-4 md:hidden">
        <NearByPostMobile
          post={prev}
          onClick={preventNoPrevPostRedirect}
          type={'prev'}
        />

        <NearByPostMobile
          post={next}
          onClick={preventNoNextPostRedirect}
          type={'next'}
        />
      </ul>
    </>
  )
}

export default NearByPosts
