import { gql, useQuery } from "@apollo/client";

const GET_SONGS = gql`
  query GetSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }
`;

export const useSongs = (playlistId) => {
  const { data, loading, error } = useQuery(GET_SONGS, {
    variables: {
      playlistId,
    },
  });
  return { data, loading, error };
};
