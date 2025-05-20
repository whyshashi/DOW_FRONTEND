import React, { useState } from "react";
import "../maincss/sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarData from "../Utils/SideBarData";
import mainImage from "../assets/images/EHSoft-img.png";
import picture from "../assets/images/Ellipse.png";
import arrowUp from "../assets/images/arrow_drop_down.svg";
import arrowDown from "../assets/images/arrow_drop_up.svg";
import arrowRight from "../assets/images/arrow_right.svg";
import Dow from "../../src/assets/images/Dow.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { first } from "lodash";
// import { Logout } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveIndex] = useState(null);

  function handleBackgroundColor(key, navlink) {
    setActiveIndex(key);
    navigate(navlink);
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  localStorage.getItem("image_url");
  const name = first_name + " " + last_name;
  const picture = localStorage.getItem("image_url");
  return (
    <div className="sidebar">
      <div>
        <div className="top-layer">
          <img className="main-img" src={Dow} alt="EHSoft Logo" />
        </div>

        <div>
          {SideBarData.map((item) => {
            const isActive =
              location.pathname === item.navlink ||
              (item.navlink !== "/" &&
                location.pathname.startsWith(item.navlink));

            return (
              <div
                key={item.key}
                onClick={() => {
                  if (item.name === "Logout") {
                    handleLogout();
                  } else {
                    handleBackgroundColor(item.key, item.navlink);
                  }
                }}
              >
                <div
                  className={`SideBarContent ${
                    isActive ? "activeSideBar" : ""
                  }`}
                >
                  <div className="drop-down">
                    {item.name === "Logout" ? (
                      <>
                        <LogoutIcon
                          sx={{
                            height: "18px",
                            width: "18px",
                            color: "#BBBBBB",
                          }}
                        />
                        <span>{item.name}</span>
                      </>
                    ) : (
                      <>
                        <img
                          src={isActive ? item?.img1 : item?.img2}
                          alt={item.name}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Info Section */}
      <div className="user-name">
        <img className=" prof_img" src={picture} alt="User Avatar" />
        <span>{name}</span>
      </div>
    </div>
  );
};

export default Sidebar;
