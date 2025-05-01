import React, { LiHTMLAttributes, ReactNode } from 'react'

interface CountProps extends LiHTMLAttributes<HTMLDivElement> {
  count: number
  text: string | ReactNode
  unit: '명' | '개' | '회'
}

function Count({ count, text, unit, className, ...rest }: CountProps) {
  return (
    <div
      className={`flex flex-col gap-4 p-4 ${className ? className : ''}`}
      {...rest}
    >
      <span className="text-white text-xl">{text}</span>

      <div className="text-white">
        <span className="text-3xl font-black">{count}</span>
        {unit}
      </div>
    </div>
  )
}

export default Count
