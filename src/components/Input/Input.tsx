import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { ...rest } = props
  return (
    <input
      //
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
