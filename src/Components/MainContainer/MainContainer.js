import React, { useEffect, useRef, useState } from "react";
import "./MainContainer.css";
import { MenuBar } from "../MenuBar/MenuBar";
import { TiThMenu } from "react-icons/ti";
import { Music } from "../Music/Music";
import { useData } from "../../Context/DataContext";
import ColorThief from "colorthief";
import Logo from "../../Assets/Logo.png";
import {FaWindowClose} from "react-icons/fa"
import { useSongs } from "../../Hooks/useSongs";
import { Loader } from "../Loader/Loader";
export const MainContainer = ({ children }) => {
  const {
    dataState: { backgroundGradient, selectedSong },
  } = useData();
  const [showMenu, setShowMenu] = useState(false);
  const [backgroundGradientval, setBackgroundGradientval] = useState("");

  const generateGradientFromImage = async (imageUrl) => {
    const dominantColor = await getDominantColor(imageUrl);
    const rgbColor = `rgb(${dominantColor.join(", ")})`;

    return `linear-gradient(to right, ${rgbColor}, #010203)`;
  };


  
  const getDominantColor = async (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    return new Promise((resolve) => {
      img.onload = function () {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        resolve(dominantColor);
      };
      img.src = imageUrl + "?not-from-cache-please";
    });
  };

  useEffect(() => {
    generateGradientFromImage(backgroundGradient)
      .then((gradient) => {
        setBackgroundGradientval(gradient);
      })
      .catch((error) => {
        console.error("Error generating gradient:", error);
      });
  }, [selectedSong, backgroundGradient]);


  const handleClick = () => {
    setShowMenu(!showMenu);
  };


  return (
    <div style={{ background: backgroundGradientval }}>
      <div className="mainContainer">
        <div className="mainContainer-menuBar">
          <MenuBar showMenu={showMenu} handleClick={handleClick} />
        </div>
        {/* {loading && <Loader/>} */}
        <div className="home-children" name="songsList">{children}</div>
        <div className="mainContainer-music">
          <div className="mobile-menu">
            <img src={Logo} alt="logo" className="header-logo" />
            <button onClick={handleClick} className="menuBtn">
              {!showMenu ? <TiThMenu /> : <FaWindowClose className="menuBtn-cross"/>}
            </button>
          </div>
          <Music />
        </div>
      </div>
    </div>
  );
};
