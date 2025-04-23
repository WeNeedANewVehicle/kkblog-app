import React, { HTMLAttributes } from 'react'

interface HorizontalLineProps extends HTMLAttributes<HTMLHRElement> {}

function HorizontalLine({ className, ...rest }: HorizontalLineProps) {
  return <hr className={`my-4 border-t ${className ?? ''}`} {...rest} />
}

export default HorizontalLine
