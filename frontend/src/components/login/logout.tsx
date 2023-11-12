import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("key");
  return <Navigate to="/" />;
};

export default Logout;
