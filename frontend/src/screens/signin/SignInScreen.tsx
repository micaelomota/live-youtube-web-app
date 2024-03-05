import { useState } from "react";
import { Card, Divider, Layout } from "antd";

import { signInStyles } from "./signIn.styles";
import logo from "../../assets/logo.svg";
import { SignInForm } from "../../components/SignInForm";
import { SignInButtons } from "../../components/SignInButtons";

export const SignInScreen = () => {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <Layout style={signInStyles.layout}>
      <Layout.Content style={signInStyles.content}>
        <Card style={signInStyles.card}>
          <h1>Faça Login</h1>
          <SignInForm />
          <Divider />
          <SignInButtons isBroken={isBroken}/>
        </Card>
      </Layout.Content>
      <Layout.Sider
        style={signInStyles.sider}
        width={"38vw"}
        hidden={isBroken}
        breakpoint="lg"
        onBreakpoint={(broken) => setIsBroken(broken)}
      >
        <Layout.Content style={signInStyles.siderContent}>
          <img
            src={logo}
            alt="Logo do Progress Tracking"
            style={signInStyles.image}
          />
          <div style={signInStyles.siderDiv}>
            <h1>Bem-vindo ao Progress Tracking</h1>
            <p>Faça login e defina suas metas</p>
          </div>
        </Layout.Content>
      </Layout.Sider>
    </Layout>
  );
};
