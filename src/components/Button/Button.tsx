import React, { ButtonHTMLAttributes } from 'react'
import Loading from '@/../public/icons/loading.svg'
import styles from '@/components/Button/Button.module.css'
import { ElementSize } from '@/common/types/styles.type'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  size?: ElementSize
}

function Button(props: ButtonProps) {
  const { children, isLoading, className, size, ...rest } = props
  return (
    <button
      className={`flex justify-center ${className ?? ''} ${size && styles[size]}`}
      {...rest}
    >
      {isLoading && <Loading />}
      {!isLoading && children}
    </button>
  )
}

export default Button
