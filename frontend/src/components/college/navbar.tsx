import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const pathName = useLocation().pathname;

  const linkStyle = "hover:text-white hover:bg-blue-500 p-3 rounded-md ";
  return (
    <div className="fixed w-full">
      <div className="w-11/12 bg-white mx-auto mt-5 rounded-lg shadow-lg p-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold italic text-blue-500">Centurion University of Technology &amp; Management</h1>
          <p className="text-red-400 font-bold ml-10">Shaping Lives.. Empowering Communities..</p>
        </div>
        <nav className="flex gap-20">
          <Link
            to="/college/home"
            className={
              linkStyle +
              `${pathName.includes("home") ? "bg-blue-500 text-white" : ""}`
            }
          >
            Home
          </Link>
          <Link
            to="/college/about"
            className={
              linkStyle +
              `${pathName.includes("about") ? "bg-blue-500 text-white" : ""}`
            }
          >
            About
          </Link>
          <Link
            to="/college/contact"
            className={
              linkStyle +
              `${pathName.includes("contact") ? "bg-blue-500 text-white" : ""}`
            }
          >
            Contact
          </Link>
          <Link to="/library/dashboard" className={linkStyle}>
            Library
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
