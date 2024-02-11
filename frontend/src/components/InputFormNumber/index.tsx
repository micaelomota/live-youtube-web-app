import React, { ComponentProps } from "react";
import { Form, InputNumber } from "antd";

interface InputFormNumberProps extends ComponentProps<typeof Form.Item> {
  placeholder: string;
}
const InputFormNumber = ({ placeholder, ...props }: InputFormNumberProps) => {
  return (
    <Form.Item {...props} className="w-full" hasFeedback>
      <InputNumber className="w-full p-2" placeholder={placeholder} />
    </Form.Item>
  );
};

export default InputFormNumber;
