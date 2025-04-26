import React, { HTMLAttributes, OptionHTMLAttributes } from 'react'

export interface SelectOptionProps
  extends OptionHTMLAttributes<HTMLOptionElement> {}

function SelectOption(props: SelectOptionProps) {
  return <option className="flex border-2" {...props} />
}

export default SelectOption
