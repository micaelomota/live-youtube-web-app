import { Route, Routes, useNavigate } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { NewTargetScreen } from "./target/NewTargetScreen";
import { AppLayout } from "../layout/AppLayout";
import TargetDetailScreen from "./target-detail";
import { NewEntry } from "./new-entry";
import { SignInScreen } from "./signin/SignInScreen";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const AppRouter = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user && auth.user !== undefined) {
      navigate("/auth/sign-in");
      return;
    }
  }, [auth]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new-target" element={<NewTargetScreen />} />
        <Route path="/target/:id" element={<TargetDetailScreen />} />
        <Route path="/target/:id/new-entry" element={<NewEntry />} />
      </Route>

      <Route path="auth">
        <Route path="sign-in" element={<SignInScreen />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
