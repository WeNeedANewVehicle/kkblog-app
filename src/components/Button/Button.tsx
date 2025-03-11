import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import Loading from '@/../public/icons/loading.svg'
import styles from '@/components/Button/Button.module.css'
import { ElementSize } from '@/common/types/styles.type'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  size?: ElementSize
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, isLoading, className, size, ...rest } = props
  return (
    <button
      className={`flex items-center justify-center ${className ?? ''} ${size && styles[size]}`}
      {...rest}
      ref={ref}
    >
      {isLoading && <Loading />}
      {!isLoading && children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
