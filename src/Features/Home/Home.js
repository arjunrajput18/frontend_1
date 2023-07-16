import React, { useEffect } from "react";
import { useSongs } from "../../Hooks/useSongs";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";
import { SingleMusicCard } from "../../Components/SingleMusicCard/SingleMusicCard";
import { useData } from "../../Context/DataContext";

export const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useSongs(Number(id));
  console.log(id);

  useEffect(() => {
    if (!id) {
      navigate("/1");
    }
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="song">
      <h1 className="song-title">song</h1>
      <ul className="song-list">
        {data?.getSongs?.map((song) => (
          <SingleMusicCard song={song} key={song.id} />
        ))}
      </ul>
    </div>
  );
};
