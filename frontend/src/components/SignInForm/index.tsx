import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type SignInFormType = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: SignInFormType) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<SignInFormType>
        name="email"
        rules={[{ required: true, message: "Insira seu email" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item<SignInFormType>
        name="password"
        rules={[{ required: true, message: "Insira sua senha" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>

      <Form.Item>
        <a href="#forgot_password" style={{ float: "right", marginBottom: 10 }}>
          Esqueceu a senha?
        </a>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
