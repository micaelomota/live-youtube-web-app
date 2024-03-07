import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { NewTargetScreen } from "./target/NewTargetScreen";
import { AppLayout } from "../layout/AppLayout";
import TargetDetailScreen from "./target-detail";
import { NewEntry } from "./new-entry";
import { SignInScreen } from "./signin/SignInScreen";
import { useAuth } from "../context/AuthContext";
import { LandingPage } from "./landing-page/LandingPage";
import { SignUpScreen } from "./signup/SignUpScreen";
import { VerificationEmailScreen } from "./verification-email/VerificationEmailScreen";

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {user ? (
          <Route>
            <Route path="/auth/verification-email" element={<VerificationEmailScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/new-target" element={<NewTargetScreen />} />
            <Route path="/target/:id" element={<TargetDetailScreen />} />
            <Route path="/target/:id/new-entry" element={<NewEntry />} />
          </Route>
        ) : (
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="auth">
              <Route path="sign-in" element={<SignInScreen />} />
              <Route path="sign-up" element={<SignUpScreen />} />
            </Route>
          </Route>
        )}
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
