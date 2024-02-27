import { Button } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const SignInScreen = () => {
  const navigate = useNavigate();

  const onClickSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  };

  const handleSignIn = async () => {
    await onClickSignInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      <Button size="large" onClick={handleSignIn}>
        Sign in with Google
      </Button>
    </div>
  );
};
