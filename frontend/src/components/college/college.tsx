import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";

const College = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default College;
