import { useState } from "react";
import { Card, Divider, Layout } from "antd";
import logo from "../../assets/logo.svg";
import { signUpStyles } from "./signUp.styles";
import { SignUpForm } from "../../components/SignUpForm";
import { SignInButtons } from "../../components/SignInButtons";

export const SignUpScreen = () => {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <Layout style={signUpStyles.layout}>
      <Layout.Content style={signUpStyles.content}>
        <Card style={signUpStyles.card}>
          <h1>Faça Cadastro</h1>
          <SignUpForm />
          <Divider />
          <SignInButtons isBroken={isBroken} />
        </Card>
      </Layout.Content>
      <Layout.Sider
        style={signUpStyles.sider}
        width={"38vw"}
        hidden={isBroken}
        breakpoint="lg"
        onBreakpoint={(broken) => setIsBroken(broken)}
      >
        <Layout.Content style={signUpStyles.siderContent}>
          <img
            src={logo}
            alt="Logo do Progress Tracking"
            style={signUpStyles.image}
          />
          <div style={signUpStyles.siderDiv}>
            <h1>Bem-vindo ao Progress Tracking</h1>
            <p>Se cadastre e defina suas metas</p>
          </div>
        </Layout.Content>
      </Layout.Sider>
    </Layout>
  );
};
