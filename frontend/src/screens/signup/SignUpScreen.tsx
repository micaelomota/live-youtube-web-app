import { useState } from "react";
import { Button, Card, Divider, Layout } from "antd";
import { auth } from "../../config/firebase";
import logo from "../../assets/logo.svg";
import { signUpStyles } from "./signUp.styles";
import { SignUpForm } from "../../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleLogo from "../../assets/googleLogo.svg";

const onClickSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

export const SignUpScreen = () => {
  const [isBroken, setIsBroken] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await onClickSignInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout style={signUpStyles.layout}>
      <Layout.Content style={signUpStyles.content}>
        <Card style={signUpStyles.card}>
          <h1>Faça Cadastro</h1>
          <SignUpForm />
          <Divider />
          <Button
            style={signUpStyles.button}
            onClick={handleSignIn}
            icon={<img src={googleLogo} alt="Logo da Google." width="15px" />}
          >
            Google
          </Button>
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
