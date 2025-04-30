import React from 'react'
import WarningIcon from '@/../public/icons/warning.svg';

interface NoPostProps {
  search: string | null;
  isNoResult: boolean;
}

function NoPost({ search, isNoResult }: NoPostProps) {
    return isNoResult && <div className='flex flex-col text-center justify-center items-center gap-4'>
        <WarningIcon className="size-20 stroke-red-600 dark:stroke-burgundy-600"/>
        {search ? '검색된 글이 없습니다' : '등록된 글이 없습니다.' }
    </div>
}

export default NoPost