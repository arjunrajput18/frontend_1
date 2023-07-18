import React, { useEffect, useState } from "react";
import "./MainContainer.css";
import { MenuBar } from "../MenuBar/MenuBar";
import { Music } from "../Music/Music";
import { useData } from "../../Context/DataContext";
import ColorThief from "colorthief";

export const MainContainer = ({ children }) => {
  const {
    dataState: { backgroundGradient, selectedSong },
  } = useData();
  const [backgroundGradientval, setBackgroundGradientval] = useState("");

  const generateGradientFromImage = async (imageUrl) => {
    const dominantColor = await getDominantColor(imageUrl);
    const rgbColor = `rgb(${dominantColor.join(", ")})`;

    return `linear-gradient(to right, ${rgbColor}, #010203)`;
  };

  // linear-gradient(to right, ${rgbColor}, #ffffff})`;
  const getDominantColor = async (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    // img.src = imageUrl + "?not-from-cache-please";

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

  console.log(backgroundGradientval, "backgroundGradientval");
  return (
    <div className="" style={{ background: backgroundGradientval }}>
      <div className="mainContainer">
      <div className="mainContainer-menuBar">
        <MenuBar />
      </div>
        <div>{children}</div>
        <div className="mainContainer-music">
          <Music />
        </div>
      </div>
    </div>
  );
};
