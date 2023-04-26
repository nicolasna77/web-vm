import "./App.css";
import NavBar from "./componants/NavBar";
import Home from "./Home";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavBar />
        <Home />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
