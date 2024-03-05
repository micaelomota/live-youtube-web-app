import { Button } from "antd";
import { SignInButtonsStyles } from "./SignInButtons.styles";
import googleLogo from "../../assets/googleLogo.svg";
import appleLogo from "../../assets/appleLogo.svg";
import microsoftLogo from "../../assets/microsoftLogo.svg";
import gitHubLogo from "../../assets/gitHubLogo.svg";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";


const SignInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

const SignInApple = () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    provider.setCustomParameters({
        // Localize the Apple authentication screen in French.
        locale: 'br'
    });
    return signInWithPopup(auth, provider);
}

const SignInMicrosoft = () => {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('mail.read');
    provider.addScope('name.read');
    return signInWithPopup(auth, provider);
}

const SignInGitHub = () => {
    const provider = new GithubAuthProvider();
    provider.addScope('name');
    return signInWithPopup(auth, provider)
}

export const SignInButtons = ({isBroken}: {isBroken: boolean}) => {
    const navigate = useNavigate()
    const handleSignIn = async (provider: String) => {
        switch (provider) {
            case 'Google': await SignInGoogle().then(() => navigate("/")); break;
            case 'Apple': await SignInApple().then(() => navigate("/")); break;
            case 'Microsoft': await SignInMicrosoft().then(() => navigate("/")); break;
            case 'GitHub': await SignInGitHub().then(() => navigate("/")); break;
        }
    }
    const styles = isBroken ? SignInButtonsStyles.buttonMobile : SignInButtonsStyles.button
    return (
        <div 
            style={isBroken ? {
                ...SignInButtonsStyles.container, flexDirection: 'column'
            } : SignInButtonsStyles.container}
        >
            <Button
                style={styles}
                onClick={() => handleSignIn('Google')}
                icon={<img src={googleLogo} alt="Logo da Google." width="15px" />}
            >
                Google
            </Button>
            <Button
                style={styles}
                onClick={() => handleSignIn('Apple')}
                icon={<img src={appleLogo} alt="Logo da Apple." width="15px" />}
            >
                Apple
            </Button>
            <Button
                style={styles}
                onClick={() => handleSignIn('Microsoft')}
                icon={<img src={microsoftLogo} alt="Logo da Microsoft." width="15px" />}
            >
                Microsoft
            </Button>
            <Button
                style={styles}
                onClick={() => handleSignIn('GitHub')}
                icon={<img src={gitHubLogo} alt="Logo da GitHub." width="15px" />}
            >
                GitHub
            </Button>
        </div>
    )
}