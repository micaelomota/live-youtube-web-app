import { Button, Form } from 'antd'
import React, { ComponentProps } from 'react'

interface ButtonFormProps extends ComponentProps<typeof Button> {
  text: string
}
const ButtonForm = ({text, ...props}: ButtonFormProps) => {
  return (
    <Form.Item className='w-[148px] h-[40px]'>
    <Button 
    className='w-full h-full flex items-center justify-center py-2'
    {...props}>
      {text}
    </Button>
  </Form.Item>
  )
}

export default ButtonForm