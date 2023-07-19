import React, { useEffect, useState } from "react";
import { useSongs } from "../../Hooks/useSongs";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";
import { SingleMusicCard } from "../../Components/SingleMusicCard/SingleMusicCard";
import { usePlaylists } from "../../Hooks/usePlaylists";
import { BiSearch } from "react-icons/bi";
import { Loader } from "../../Components/Loader/Loader";

export const Home = () => {
  const { id } = useParams();
  const [searchInput, setSearchInput] = useState();
  const navigate = useNavigate();
  const { data: data1 } = usePlaylists();
  const { data, loading, error } = useSongs(Number(id));

  const activeMenuName = data1?.getPlaylists?.find(
    (list) => list.id === Number(id)
  );

  useEffect(() => {
    if (!id) {
      navigate("/1");
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return <div> <Loader/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transformed = () => {
    let filteredData = [...data?.getSongs];
    if (searchInput) {
      filteredData = filteredData.filter(
        (list) =>
          list.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          list.artist.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filteredData;
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="song">
      <div className="heading-menu-name">{activeMenuName?.title}</div>
      <div className="search-box-container">
        <input
          type="search"
          placeholder="Search Song, Artist"
          className="search-box"
          value={searchInput}
          onChange={handleChange}
        />
        <BiSearch className="search-logo" />
      </div>
      <ul className="song-list">
        {transformed().map((song) => (
          <SingleMusicCard song={song} key={song._id} />
        ))}
      </ul>
    </div>
  );
};
