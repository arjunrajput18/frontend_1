import React, { useEffect, useRef, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaPauseCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useData } from "../../Context/DataContext";
import "./Music.css";

export const Music = () => {
  const {
    dataState: { selectedSong, playing },
    audioRef,
  } = useData();
  const [isPlaying, setIsPlaying] = useState(false);
 



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
    <div>
      <div className="song-details">
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
      <div className="more-play-mute-btn">
        <div>
          <button className="react-icons-btns">
            <BsThreeDots />
          </button>
        </div>
        <div className="back-play-next-btn">
          <button className="react-icons-btns">
            <IoPlayBack />
          </button>
          <audio ref={audioRef} src={selectedSong?.url} />
          <button className="react-icons-btns" onClick={handlePlayPause}>
            {isPlaying ? <FaPauseCircle /> : <BsPlayCircle />}
          </button>
          <button className="react-icons-btns">
            <IoPlayForward />
          </button>
        </div>
        <div>
          <button className="react-icons-btns">
            <HiMiniSpeakerWave />
          </button>
        </div>
      </div>
    </div>
  );
};
