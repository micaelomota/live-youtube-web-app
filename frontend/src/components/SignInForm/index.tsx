import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { auth } from "../../config/firebase";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

type SignInFormType = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const navigate = useNavigate();

  const redirect = (user: User) => {
    console.log(user)
    if (user?.emailVerified) {
        navigate("/");
    } else {
        navigate("/auth/verification-email");
    }
}

  const onFinish = async (values: SignInFormType) => {
    try {
      const credentialUser = await signInWithEmailAndPassword(auth, values.email, values.password);
      redirect(credentialUser.user);
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
          prefix={<MailOutlined className="site-form-item-icon" />}
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
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <Link to="/auth/sign-up">
          Não tem uma conta?
        </Link>
        <Link to="/auth/forgot-password" style={{textAlign: "right"}}>
          Esqueceu a senha?
        </Link>
        </div>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};
