import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { NewTargetScreen } from "./target/NewTargetScreen";
import { AppLayout } from "../layout/AppLayout";
import TargetDetailScreen from "./target-detail";
import { NewEntry } from "./new-entry";
import { SignInScreen } from "./signin/SignInScreen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new-target" element={<NewTargetScreen />} />
        <Route path="/target/:id" element={<TargetDetailScreen />} />
        <Route path="/target/:id/new-entry" element={<NewEntry />} />
      </Route>

      {/* TODO: redirecionar para home se o cara tiver logado */}
      {/* TODO: redirecionar para login se o cara não tiver logado */}

      <Route path="auth">
        <Route path="sign-in" element={<SignInScreen />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
