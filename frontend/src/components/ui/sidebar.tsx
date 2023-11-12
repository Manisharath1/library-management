import Menu from "@/model/Menu";
import { Link } from "react-router-dom";
import logo from "../../assets/centurian_logo-r.png";
interface SideBarProps {
  menus: Menu[];
  active: string;
}

const SideBar: React.FC<SideBarProps> = ({ menus, active }) => {
  if (menus.length === 0) {
    return null;
  }

  const updatedMenus = [...menus];
  const lastMenu = updatedMenus.pop();
  const basicSideProperty =
    "shadow-lg top-0 left-0 z-40 w-64 h-screen px-3 py-4 overflow-y-auto bg-white";
  const transitionProperty =
    " transition-transform -translate-x-full sm:translate-x-0";
  const flexProperty = " flex flex-col justify-between";
  const asideStyle = basicSideProperty + transitionProperty + flexProperty;
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={asideStyle}
      aria-label="Sidebar"
    >
      <div>
        <div className="log-box">
          <a href="/">
            <img src={logo} alt="no img" />
          </a>
        </div>
        <ul className="space-y-2 font-medium mt-5">
          {updatedMenus.map(({ label, icon, path }) => (
            <li key={label}>
              <Link
                to={path}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group text-md ${
                  active.includes(path) ? "bg-gray-200 dark:bg-gray-700" : ""
                }`}
              >
                <span className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  {icon}
                </span>
                <span className="ml-3">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {lastMenu && (
        <div>
          <Link
            to={lastMenu.path}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  group text-m"
          >
            <span className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900">
              {lastMenu.icon}
            </span>
            <span className="ml-3">{lastMenu.label}</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
