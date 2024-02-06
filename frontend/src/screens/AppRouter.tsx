import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "./home/HomeScreen";
import { NewTargetScreen } from "./target/NewTargetScreen";
import { AppLayout } from "../layout/AppLayout";
import TargetDetailScreen from "./target-detail";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new-target" element={<NewTargetScreen />} />
        <Route path="/target/:id" element={<TargetDetailScreen />} />
      </Route>
    </Routes>
  );
};
