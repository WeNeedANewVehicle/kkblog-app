import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import Loading from '@/../public/icons/loading.svg'
import { kia } from '@/theme/font'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, isLoading, className, ...rest } = props
  return (
    <button
      className={`flex items-center justify-center ${kia.className} ${className ?? ''}`}
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
