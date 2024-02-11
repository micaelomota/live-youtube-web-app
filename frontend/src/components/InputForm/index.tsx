import React, { ComponentProps } from 'react'
import { Form, Input } from 'antd'


interface InputFormProps extends ComponentProps<typeof Form.Item> {
  placeholder: string
  type?: "text" | "password" | "email" | "date"
}
const InputForm = ({placeholder, ...props}: InputFormProps) => {
  return (
      <Form.Item 
        {...props}
        hasFeedback
        >
          <Input 
           className="p-3"
          placeholder={placeholder} 
          type={props.type || "text"}
          />
        </Form.Item>
  )
}

export default InputForm