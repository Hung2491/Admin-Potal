import { BrowserRouter } from "react-router";
import Navigator from "./router/Navigator";
import { AppProviders } from "./hook";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Navigator></Navigator>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
