import { useContext } from "react";
import Login from "./page/Login";
import { AuthContext } from "./context/AuthContext";
import Main from "./page/Main";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="md:px-0">{isAuthenticated ? <Main /> : <Login />}</div>
  );
};
export default Home;
