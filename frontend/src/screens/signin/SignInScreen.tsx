import { Button } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      <Button size="large" onClick={() => {
        onClickSignInWithGoogle().then(() => navigate("/"))
      }}>
        Sign in with Google
      </Button>
    </div>
  );
};
