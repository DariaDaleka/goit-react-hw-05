import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTrendingMovies();
        if (data.length === 0) {
          setError("No trending movies found.");
        } else {
          setMovies(data);
        }
      } catch {
        setError("Movies are not found!");
      } finally {
        setLoading(false);
      }
    };

    getAllMovies();
  }, []);

  return (
    <>
      <h2 className={s.title}>Trending Movies</h2>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
