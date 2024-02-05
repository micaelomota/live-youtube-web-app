import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./screens/AppRouter";
import { TargetContextProvider } from "./context/TargetContext";

function App() {
  return (
    <BrowserRouter>
      <TargetContextProvider>
        <AppRouter />
      </TargetContextProvider>
    </BrowserRouter>
  );
}

export default App;
