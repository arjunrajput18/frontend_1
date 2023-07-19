import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { DataReducer, initialState } from "../Reducer/DataReducer";
import { useSongs } from "../Hooks/useSongs";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(DataReducer, initialState);
  const { data, loading, error } = useSongs(1);

  const audioRef = useRef(null);
  useEffect(() => {
    dataDispatch({ type: "INTIALIZE_SONG", payload: data?.getSongs[1] });
  }, [data]);


  return (
    <DataContext.Provider value={{ dataState, dataDispatch,audioRef }}>
      <>{children}</>
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
