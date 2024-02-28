import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

type SignInFormType = {
    email: string;
    password: string;
}

export const SignInForm = () => {
    const onFinish = (values: SignInFormType) => {
        console.log('Form: ', values);
    };
    
    return (
        <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
        <Form.Item<SignInFormType>
            name="email"
            rules={[{ required: true, message: 'Insira seu email' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item<SignInFormType>
            name="password"
            rules={[{ required: true, message: 'Insira sua senha' }]}
        >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Senha" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Entrar
            </Button>
        </Form.Item>
    </Form>
  );
}