import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./screens/AppRouter";
import { TargetContextProvider } from "./context/TargetContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TargetContextProvider>
          <AppRouter />
        </TargetContextProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
