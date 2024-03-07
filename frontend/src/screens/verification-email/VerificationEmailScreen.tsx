import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";

export const VerificationEmailScreen = () => {
    const { user } = useAuth();
    const [emailSended, setEmailSended] = useState(false);

    useEffect(() => {
        if (user && !user?.emailVerified) {
            sendEmailVerification(user).then(() => setEmailSended(true));
        }
    }, [])

    return (
        <div>
            {user?.emailVerified ? (
                <>
                    <h1>Email Verificado!</h1>
                    <Link to="/">Voltar para a Home</Link>
                </>
            ) : (
                <>
                    {emailSended ? (
                        <h1>Um email de verificação foi enviado para {user?.email}!</h1>
                    ) : (
                        <h1>Estamos enviando um email de verificação...</h1>
                    )}
                </>
            )}
        </div>
    )
}