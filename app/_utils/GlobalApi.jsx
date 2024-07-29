import request, { gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCinemas = async () => {
  const query = gql`
  query {
    cinemas {
      id
      icon {
        id
        url
      }
      location
      name
      openTime
      profileIcon {
        id
        url
      }
      rating
      screen {
        id
        name
        showing {
          id
        }
      }
    }
  }
    `;

  const result = await request(MASTER_URL, query);
  return result;
};



const GetMovies = async () => {
  const query = gql`
  query {
    movies {
      id
      title
      icon {
        url
        id
      }
      language
      plot
      rating
      runtime
      rated
      genre
      director
      cast
      showing {
        screen {
          name
          id
        }
      }
    }
  }`;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetMovieById = async (id) => {
  const query = gql`
  query MovieById($id: ID!) {
    movie(where: {id: $id}) {
      cast
      director
      genre
      icon {
        id
        url
      }
      id
      language
      plot
      rated
      rating
      runtime
      title
      trailerUrl
      showing {
        screen {
          name
          id
        }
      }
    }
  }`

  const variables = {
    id: id
  };
  const result = await request(MASTER_URL, query, variables);
  return result;
};


const GetScreens = async () => {
  const query = gql`
  query {
    screens(first: 100) {
      id
      name
      capacity
      cinema {
        id
        name
      }
      seatLayout
      showing {
        id
        price
        movie {
          id
          title
        }
      }
    }
  }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};


const GetShowings = async () => {
  const query = gql`
  query {
    showings(first: 100) {
      id
      movie {
        id
        title
        icon {
          url
          id
        }
      }
      price
      startTime
      screen {
        name
        id
        cinema {
          name
          id
        }
      }
    }
  }`;

  const result = await request(MASTER_URL, query);
  return result;
};



const GetScreenDetails = async (cinemaName, screenName) => {
  const query = gql`
    query ($cinemaName: String!, $screenName: String!) {
      screens(where: {cinema: {name: $cinemaName}, name: $screenName}) {
        id
        name
        capacity
        seatLayout
        cinema {
          id
          name
        }
      }
    }
  `;
 
  const variables = {
    cinemaName: cinemaName,
    screenName: screenName
  };

  const result = await request(MASTER_URL, query, variables);
  return result;
};



export default {
  GetCinemas,
  GetMovies,
  GetMovieById,
  GetScreens,
  GetShowings,
  GetScreenDetails
};