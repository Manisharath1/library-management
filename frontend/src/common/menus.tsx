import Menu from "@/model/Menu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { LuBook } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

export function getAdminMenus(): Menu[] {
  return [
    {
      label: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
      path: "/library/dashboard",
    },
    {
      label: "Batch details",
      icon: <SiGoogleclassroom />,
      path: "/library/batch-details",
    },
    {
      label: "Book details",
      icon: <LuBook />,
      path: "/library/book-details",
    },
    {
      label: "Issue book",
      icon: <FiBookOpen />,
      path: "/library/issue-book",
    },
    {
      label: "Pending approval",
      icon: <RxAvatar />,
      path: "/library/pending-approval",
    },
    {
      label: "Logout",
      icon: <RiLogoutBoxRLine />,
      path: "/logout",
    },
  ];
}

export function getUserMenus(): Menu[] {
  return [
    {
      label: "Home",
      icon: <FaHome />,
      path: "/library/user/home",
    },
    {
      label: "Your book",
      icon: <ImBooks />,
      path: "/library/user/your-book",
    },
    // {
    //   label: "Notification",
    //   icon: <BsFillBellFill />,
    //   path: "/library/user/notification",
    // },
    {
      label: "Logout",
      icon: <RiLogoutBoxRLine />,
      path: "/logout",
    },
  ];
}
