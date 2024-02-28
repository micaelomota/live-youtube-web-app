import { useState } from "react";
import { Button, Card, Divider, Layout } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { signInStyles } from "./SignIn.styles";
import googleLogo from "../../assets/googleLogo.svg";
import logo from "../../assets/logo.svg";
import { SignInForm } from "../../components/SignInForm";

const onClickSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const SignInScreen = () => {
  const [isBroken, setIsBroken] = useState(false);
  
  return (
    <Layout style={signInStyles.layout}>
      <Layout.Content style={signInStyles.content}>
        <Card style={signInStyles.card}>
          <h1>Faça Login</h1>
          <SignInForm />
          <Divider />
          <Button 
            style={signInStyles.button}
            onClick={onClickSignInWithGoogle}
            icon={<img src={googleLogo} alt="Logo da Google." width="15px" />}
          >
            Google
          </Button>
        </Card>
      </Layout.Content>
      <Layout.Sider 
        style={signInStyles.sider} 
        width={500}
        hidden={isBroken}
        breakpoint="lg"
        onBreakpoint={(broken) => setIsBroken(broken)}
      >
        <img src={logo} alt="Logo do Progress Tracking" style={signInStyles.image}/>
        <Layout.Content style={signInStyles.siderContent}>
          <h1>
              Bem-vindo ao Progress Tracking
            </h1>
            <p>
              Faça login e defina suas metas
            </p>
        </Layout.Content>
      </Layout.Sider>
    </Layout>
  );
};
