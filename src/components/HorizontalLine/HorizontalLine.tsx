import React from 'react'

interface HorizontalLineProps {
  h?: number
  text?: string
}
function HorizontalLine({ h = 1, text }: HorizontalLineProps) {
  return (
    <div className="flex gap-2 items-center">
      <hr className={`flex-grow w-[${h}px]`} />
      {text}
      {text && <hr className={`flex-grow w-[${h}px]`} />}
    </div>
  )
}

export default HorizontalLine
