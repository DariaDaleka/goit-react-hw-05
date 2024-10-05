import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to fetch trending movies. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    getMovies();
  }, []);

  
  if (loading) {
    return <p className={css.loadingMessage}>Loading trending movies...</p>;
  }


  if (error) {
    return <p className={css.errorMessage}>{error}</p>;
  }

 
  if (movies.length === 0) {
    return <p className={css.noMoviesMessage}>No trending movies available.</p>;
  }

  return (
    <div>
      <h1 className={css.homeTitle}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
