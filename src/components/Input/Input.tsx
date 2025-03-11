import React, { forwardRef, InputHTMLAttributes } from 'react'
import styles from '@/components/Input/Input.module.css'
import { ElementSize } from '@/common/types/styles.type'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: ElementSize
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inputSize, className, ...rest } = props
  return (
    <input
      //
      className={`${className ?? ''} ${inputSize ? styles[inputSize] : ''}`}
      {...rest}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input
