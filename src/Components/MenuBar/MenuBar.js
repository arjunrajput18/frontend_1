import React from "react";
import "./MenuBar.css";
import { usePlaylists } from "../../Hooks/usePlaylists";
import { NavLink } from "react-router-dom";

export const MenuBar = () => {
  const { loading,data} = usePlaylists();
  
  const getActiveStyle = ({ isActive }) => {
    if (isActive) {
      return {
        color:"#ffffff"
      };
    } else {
      return {
        color: "rgba(255, 240, 245, 0.5)", 
      };
    }
  };
  



  return (
    <div className="menu-bar">
      <ul className="menu-bar-list">
        {data?.getPlaylists?.map((item) => (
          <li key={item?.id} className="menu-bar-item">
          <NavLink to={`/${item?.id}`} className="menu-title" style={getActiveStyle}>
            {item?.title}
          </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
