import React, { ComponentProps } from "react";
import { DatePicker, Form } from "antd";

interface DatePickerFormProps extends ComponentProps<typeof Form.Item> {
  placeholder: string;
}
const DatePickerForm = ({ placeholder, ...props }: DatePickerFormProps) => {
  return (
    <Form.Item {...props} hasFeedback>
      <DatePicker className="p-3" placeholder={placeholder} />
    </Form.Item>
  );
};

export default DatePickerForm;
