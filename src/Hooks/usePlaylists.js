import { useQuery, gql } from "@apollo/client";

const GET_PLAYLISTS = gql`
  query Query {
    getPlaylists {
      title
      id
    }
  }
`;

export const usePlaylists = () => {
  const { loading, data } = useQuery(GET_PLAYLISTS);

  return { loading, data };
};
