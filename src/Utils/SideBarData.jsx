import { Children } from "react";
import Dashboard from "../assets/images/Dashboard.svg";
import DashboardAfter from "../assets/images/Dashboard2.svg";
import image4 from "../assets/images/file_present.svg";
import image3 from "../assets/images/file_present_white.svg";
import image2 from "../assets/images/health_and_safety_img1.svg";
import image1 from "../assets/images/health_and_safety_img2.svg";
import image6 from "../assets/images/local_fire_department_img1.svg";
import image5 from "../assets/images/local_fire_department_img2.svg";
import image8 from "../assets/images/person_img1.svg";
import image7 from "../assets/images/person_img2.svg";

const SideBarData = [
  {
    name: "Dashboard",
    img1: DashboardAfter,
    img2: Dashboard,
    key: 5,
    navlink: "/dashboard",
  },
  {
    name: "Document Management",
    img1: image3,
    img2: image4,
    key: 1,
    navlink: "/document-management",
  },

  {
    name: "Safety Training",
    img1: image1,
    img2: image2,
    key: 2,
    navlink: "/safety-training",
  },

  {
    name: "Incident Reporting",
    img1: image5,
    img2: image6,
    key: 3,
    navlink: "/incident-reporting",
  },
  {
    name: "User Management",
    img1: image7,
    img2: image8,
    key: 4,
    navlink: "/user-management",
  },
  {
    name: "Logout",
    key: 5,
    navlink: "/",
  },
];

export default SideBarData;
