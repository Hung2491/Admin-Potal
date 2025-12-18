import { BrowserRouter } from "react-router";
import Navigator from "./router/Navigator";
import { AuthProvider } from "./hook/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigator></Navigator>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
