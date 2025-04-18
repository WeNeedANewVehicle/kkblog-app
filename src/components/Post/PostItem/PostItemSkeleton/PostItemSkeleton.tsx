import React from 'react'

function PostItemSkeleton() {
  return (
    <li className='bg-white dark:bg-gray-800 flex flex-col gap-4 relative shadow-2xl p-4 overflow-hidden '>
        <div className="bg-gray-200 dark:bg-gray-700 aspect-video [&>*]:animate-pulse" />
        <div className="flex flex-col aspect-video gap-4 [&>*]:animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 w-[90%] h-[1.5rem]" />

            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-2">
                  <div className="bg-gray-200 dark:bg-gray-700 w-full h-[1.5rem]" />
                  <div className="bg-gray-200 dark:bg-gray-700 w-full h-[1.5rem]" />
                  <div className="bg-gray-200 dark:bg-gray-700 w-[80%] h-[1.5rem]" />
                  <div className="bg-gray-200 dark:bg-gray-700 w-[50%] h-[1.5rem]" />
              </div>

              <div className='flex justify-between'>
                  <div className='bg-gray-200 dark:bg-gray-700 w-24 h-[1.5rem]' />
                  <div className='bg-gray-200 dark:bg-gray-700 w-16 h-[1.5rem]' />
              </div>
            </div>
        </div>
        
    </li>
  )
}

export default PostItemSkeleton