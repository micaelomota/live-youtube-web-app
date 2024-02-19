import { Form, Select } from 'antd'
import React, { ComponentProps } from 'react'

interface SelectFormProps extends ComponentProps<typeof Form.Item> {
  placeholder: string
  options: Record<string, string>[]
}

const SelectForm = ({placeholder, options, ...props}: SelectFormProps) => {
  return (
    <Form.Item 
    label={props.label} 
    name={props.name}
    >
      <Select 
      placeholder={placeholder}
      className='h-11'
      options={options} />
    </Form.Item>
  )
}

export default SelectForm