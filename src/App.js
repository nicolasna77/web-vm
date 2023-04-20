import "./App.css";
import NavBar from "./componants/NavBar";
import Home from "./Home";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Home />
    </AuthProvider>
  );
}

export default App;
