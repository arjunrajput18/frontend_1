import React, { useEffect, useRef, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { ImVolumeMute2 } from "react-icons/im";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { FaPauseCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useData } from "../../Context/DataContext";
import "./Music.css";
import { useSongs } from "../../Hooks/useSongs";
import { useParams } from "react-router-dom";

export const Music = () => {
  const {
    dataState: { selectedSong, playing },
    dataDispatch,
    audioRef,
  } = useData();

  const { id } = useParams();
  const { data, loading, error } = useSongs(Number(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Added state for mute/unmute

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (selectedSong && playing) {
      audioRef?.current.pause();
      audioRef?.current.load();
      audioRef?.current.play();
      setIsPlaying(true);
    }
  }, [selectedSong, playing]);

  useEffect(() => {
    const updateProgress = () => {
      const { currentTime, duration } = audioRef?.current;
      const progressPercent = (currentTime / duration) * 100;
      setCurrentTime(currentTime);
      setProgress(progressPercent);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);

    return () => {
      audioRef?.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioRef]);

  const handleSeek = (e) => {
    const seekTime =
      (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };
  const findIndexById = (songId) => {
    console.log(songId);
    return data?.getSongs.findIndex((item) => item._id === songId);
  };

  const handlePlayBack = () => {
    const currentIndex = findIndexById(selectedSong._id);
    if (currentIndex) {
      const prevIndex = currentIndex - 1;
      const prevSong = data?.getSongs?.find((item, i) => i === prevIndex);
      dataDispatch({ type: "SELECTED_SONG", payload: prevSong });
    } 
  };

  const handlePlayNext = () => {
    console.log("a")
    const currentIndex = findIndexById(selectedSong._id);
    console.log(currentIndex)
    if (currentIndex< data?.getSongs.length-1) {
    const nextIndex = currentIndex < data?.getSongs.length && currentIndex + 1;
    const prevSong = data?.getSongs?.find((item, i) => i === nextIndex);
    dataDispatch({ type: "SELECTED_SONG", payload: prevSong });
    }  
  };

  const handleDisabled = () => {
    console.log("a")
    const indexPosition = findIndexById(selectedSong._id);
    console.log(indexPosition,"a",data?.getSongs.length)
    const isDisabled=(indexPosition===0 || indexPosition===data?.getSongs.length+1) ?true :false
    return isDisabled;
  };

  return (
    <div className="main-menu-box">
      <div className="main-music-container">
        <div>
          <div className="song-details heading">
            <h2 className="song-title-heading">{selectedSong?.title}</h2>
            <p className="song-artist-heading">{selectedSong?.artist}</p>
          </div>
          <div className="img-box">
            <img
              src={selectedSong?.photo}
              className="selectedSong-img"
              alt="song-img"
            />
          </div>
          <div className="time-labels">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="total-duration">
              {formatTime(audioRef.current?.duration)}
            </span>
          </div>

          <div className="music-seeker">
            <div className="seeker-bar" onClick={handleSeek}>
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="more-play-mute-btn">
            <div>
              <button className="react-icons-btns-dots round-circle">
                <BsThreeDots />
              </button>
            </div>
            <div className="back-play-next-btn">
              <button
                className="react-icons-btns react-icons-btns-size-2"
                onClick={handlePlayBack}
                disabled={!handleDisabled}
              >
                <IoPlayBack />
              </button>
              <audio ref={audioRef} src={selectedSong?.url} />
              <button
                className="react-icons-btns react-icons-btns-size "
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPauseCircle /> : <FaCirclePlay />}
              </button>
              <button
                className="react-icons-btns react-icons-btns-size-2 "
                onClick={handlePlayNext}
                disabled={!handleDisabled}
              >
                <IoPlayForward />
              </button>
            </div>
            <div>
              <button
                className="react-icons-btns round-circle"
                onClick={handleMuteUnmute}
              >
                {!isMuted ? <HiMiniSpeakerWave /> : <HiMiniSpeakerXMark />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
