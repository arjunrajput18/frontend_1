import React from "react";
import "./MenuBar.css";
import { usePlaylists } from "../../Hooks/usePlaylists";
import { NavLink } from "react-router-dom";

export const MenuBar = () => {
  const { loading,data} = usePlaylists();
  


  return (
    <nav className="menu-bar">
      <ul className="menu-bar-list">
        {data?.getPlaylists?.map((item) => (
          <li key={item?.id} className="menu-bar-item">
          <NavLink to={`/${item?.id}`}>
            {item?.title}
          </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
