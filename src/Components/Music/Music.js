import React, { useEffect, useRef, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaPauseCircle } from "react-icons/fa";
import {FaCirclePlay} from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs";
import { useData } from "../../Context/DataContext";
import "./Music.css";

export const Music = () => {
  const {
    dataState: { selectedSong, playing },
    audioRef,
  } = useData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(50); 



  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (selectedSong && playing) {
      audioRef.current.pause();
      audioRef.current.load();
      // audioRef.current.play();
      setIsPlaying(true);
      
     
    }
  }, [selectedSong, playing]);

  return (
    <div className="main-music-container">
    <div>


      <div className="song-details heading">
        <h2 className="song-title">{selectedSong?.title}</h2>
        <p className="song-artist">{selectedSong?.artist}</p>
      </div>
      <div>
        <img 
          src={selectedSong?.photo}
          className="selectedSong-img"
          alt="song-img"
 
        />
      </div>
      <div className="music-seeker">
      <div className="seeker-bar">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
      <div className="more-play-mute-btn">
        <div>
          <button className="react-icons-btns round-circle">
            <BsThreeDots />
          </button>
        </div>
        <div className="back-play-next-btn">
          <button className="react-icons-btns react-icons-btns-size-2  ">
            <IoPlayBack />
          </button>
          <audio ref={audioRef} src={selectedSong?.url} />
          <button className="react-icons-btns react-icons-btns-size " onClick={handlePlayPause}>
            {isPlaying ? <FaPauseCircle /> : <FaCirclePlay />}
          </button>
          <button className="react-icons-btns react-icons-btns-size-2 ">
            <IoPlayForward />
          </button>
        </div>
        <div>
          <button className="react-icons-btns round-circle">
            <HiMiniSpeakerWave />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
