import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
