import axios from "axios";

const API_KEY = "a53248d7e5c27da3d9e176a2b8564ebd"; 
const BASE_URL = "https://api.themoviedb.org/3";


axios.defaults.baseURL = BASE_URL;


const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTMyNDhkN2U1YzI3ZGEzZDllMTc2YTJiODU2NGViZCIsIm5iZiI6MTcyODEyNTE1Ni4xOTYzOTMsInN1YiI6IjY3MDExNWM1NjdjNmZiMDlmZmY4M2YzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pM4PPpQnKwet2OyEqNKoUzUF7hXLM7VFF3W1JREEXqU",
  },
};


const defaultParams = {
  language: "en-US",
  include_adult: false,
  api_key: API_KEY, 
};


export const getTrendingMovies = async () => {
  try {
    const { data } = await axios.get(`/trending/movie/day`, {
      ...options,
      params: defaultParams,
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
    throw error;
  }
};


export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(`/search/movie`, {
      ...options,
      params: {
        ...defaultParams,
        query: encodeURIComponent(query),
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error("Error searching movies: ", error);
    throw error;
  }
};


export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, {
      ...options,
      params: defaultParams,
    });
    return data;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    throw error;
  }
};


export const getMoviesCredits = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`, {
      ...options,
      params: defaultParams,
    });
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits: ", error);
    throw error;
  }
};


export const getMoviesReview = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`, {
      ...options,
      params: {
        ...defaultParams,
        page: 1,
      },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching movie reviews: ", error);
    throw error;
  }
};
