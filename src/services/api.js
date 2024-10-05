import axios from "axios";


const API_KEY = "a53248d7e5c27da3d9e176a2b8564ebd";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTMyNDhkN2U1YzI3ZGEzZDllMTc2YTJiODU2NGViZCIsIm5iZiI6MTcyODEyNTE1Ni4xOTYzOTMsInN1YiI6IjY3MDExNWM1NjdjNmZiMDlmZmY4M2YzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pM4PPpQnKwet2OyEqNKoUzUF7hXLM7VFF3W1JREEXqU";


axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${BEARER_TOKEN}`;
axios.defaults.params = {
  api_key: API_KEY,
  language: "en-US",
};


const fetchData = async (url, params = {}) => {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error; 
  }
};



export const getTrendingMovies = async () => {
  const data = await fetchData(`/trending/movie/day`);
  return data.results;
};

export const searchMovies = async (query) => {
  const data = await fetchData(`/search/movie`, {
    query: encodeURIComponent(query),
    include_adult: false,
    page: 1,
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  return await fetchData(`/movie/${movieId}`);
};

export const getMoviesCredits = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMoviesReview = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/reviews`, { page: 1 });
  return data.results;
};
