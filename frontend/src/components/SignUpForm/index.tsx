import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

type SignUpFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values: SignUpFormType) => {
    try {
      if (values.password != values.confirmPassword) throw new Error('As senhas não conferem');
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await updateProfile(userCredential.user, {displayName: values.name})
      
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<SignUpFormType>
        name="name"
        rules={[{required: true, message: "Insira seu nome"}]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nome"
        />
      </Form.Item>
      <Form.Item<SignUpFormType>
        name="email"
        rules={[{ required: true, message: "Insira seu email" }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item<SignUpFormType>
        name="password"
        rules={[{ required: true, message: "Insira sua senha" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>

      <Form.Item<SignUpFormType>
        name="confirmPassword"
        rules={[{ required: true, message: "Confirme sua senha" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirme sua Senha"
        />
      </Form.Item>

      <Form.Item>
        <Link to="/auth/sign-in" style={{ float: "right", marginBottom: 10 }}>Já tem uma conta?</Link>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};
