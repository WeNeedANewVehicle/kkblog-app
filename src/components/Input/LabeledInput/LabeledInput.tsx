import React, { LabelHTMLAttributes, ReactNode } from 'react'
import styles from '@/components/Input/LabeledInput/LabledInput.module.css'

interface LabeledTextProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode
  required?: boolean
}

function LabeledText({
  label,
  required,
  children,
  className,
  ...rest
}: LabeledTextProps) {
  return (
    <label className={`flex flex-column gap-half ${className ?? ''}`} {...rest}>
      <div className={styles.text}>
        {label} {required && <b className={styles.required}>*</b>}
      </div>
      {children}
    </label>
  )
}

export default LabeledText
