import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <input
      //
      className={`w-full px-3.5 py-2.5 border-2 border-gray-800 outline-0 ${className || ''}`}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
