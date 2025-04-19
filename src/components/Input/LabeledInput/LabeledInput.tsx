import React, { LabelHTMLAttributes, ReactNode } from 'react'

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
    <label className={`flex flex-col gap-2 ${className ?? ''}`} {...rest}>
      <div className="font-bold">
        {label} {required && <b className="text-burgundy-500">*</b>}
      </div>
      {children}
    </label>
  )
}

export default LabeledText
