import React from "react";
import "./MenuBar.css";
import { usePlaylists } from "../../Hooks/usePlaylists";
import { NavLink } from "react-router-dom";
import Profile1 from "../../Assets/Profile1.png";
import Logo from "../../Assets/Logo.png";
export const MenuBar = ({showMenu}) => {
  const { data } = usePlaylists();

  const getActiveStyle = ({ isActive }) => {
    if (isActive) {
      return {
        color: "#ffffff",
      };
    } else {
      return {
        color: "rgba(255, 240, 245, 0.5)",
      };
    }
  };

  return (
    <div className="menu-bar">
    <div className="desktop">
    <img src={Logo} alt="logo" className="header-logo" />
      <ul className="menu-bar-list desktop">
        {data?.getPlaylists?.map((item) => (
          <li key={item?.id} className="menu-bar-item">
            <NavLink
              to={`/${item?.id}`}
              className="menu-title"
              style={getActiveStyle}
            >
              {item?.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="Profile-Logo">
        <img src={Profile1} alt="img1" className="img-profile" />
      </div>
    </div>


      {showMenu &&<ul className="menu-bar-list mobile">
        {data?.getPlaylists?.map((item) => (
          <li key={item?.id} className="menu-bar-item">
            <NavLink
              to={`/${item?.id}`}
              className="menu-title"
              style={getActiveStyle}
            >
              {item?.title}
            </NavLink>
          </li>
        ))}
      </ul>}
    </div>
  );
};
