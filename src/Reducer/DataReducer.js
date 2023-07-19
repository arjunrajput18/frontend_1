export const initialState = {
  selectedSong: "",
  playing:false,
  backgroundGradient:"",
  
};

export const DataReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INTIALIZE_SONG":
      return {
        ...state,
        selectedSong: payload,
        backgroundGradient:payload?.photo
      };
    case "SELECTED_SONG":
      return {
        ...state,
        selectedSong: payload,
        backgroundGradient:payload?.photo
      };
      case "PLAYING":return{
        ...state,
        playing: payload,
      }



    default:
      return {
        state,
      };
  }
};
