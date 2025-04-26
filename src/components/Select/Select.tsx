import React, { HTMLAttributes, SelectHTMLAttributes } from 'react'
import SelectOption, { SelectOptionProps } from './SelectOption'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionProps[]
}

function Select({ options, ...rest }: SelectProps) {
  return (
    <select
      className="flex w-fit h-fit border-2 border-gray-800 dark:border-gray-600 box-sm"
      {...rest}
    >
      {options.map((option, index) => (
        <SelectOption key={index} {...option} />
      ))}
    </select>
  )
}

export default Select
