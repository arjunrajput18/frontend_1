import React, { useEffect, useState } from "react";
import "./MainContainer.css";
import { MenuBar } from "../MenuBar/MenuBar";
import { Music } from "../Music/Music";
import { useData } from "../../Context/DataContext";

export const MainContainer = ({ children }) => {
  const {dataState:{backgroundGradient,selectedSong}}=useData()
  const [backgroundGradientval, setBackgroundGradientval] = useState("");

const generateGradientFromImage = (imageUrl) => {

  return `linear-gradient(90deg,rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7)), url(${imageUrl}) `;
};


useEffect(()=>{
  setBackgroundGradientval(generateGradientFromImage(backgroundGradient))
},[selectedSong])



  return (
    <div className="mainContainer" >
      <div>
        <MenuBar />
      </div>
      <div>{children}</div>
      <Music />
    </div>
  );
};
