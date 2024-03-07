import { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Styles } from "./ForgotPassword.styles";


type ForgotPasswordFormType = {
  email: string;
};

export const ForgotPassword = () => {
  const [sendedEmail, setSendedEmail] = useState(false);
  
  const onFinish = (values: ForgotPasswordFormType) => {
      sendPasswordResetEmail(auth, values.email).then(
        () => setSendedEmail(true)
      );
  };

    return (
      <Form initialValues={{ remember: true }} onFinish={onFinish} style={Styles.form}>
        <h1>Recuperação de Senha</h1>
        <Form.Item<ForgotPasswordFormType>
          name="email"
          rules={[{ required: true, message: "Insira seu email" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Enviar
          </Button>
        </Form.Item>
        <span style={{color: "green"}}>{sendedEmail && (<>Email de recuperação de senha enviado!</>)}</span>
      </Form>
    )
}