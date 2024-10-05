import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import SearchForm from "../../components/SearchForm/SearchForm";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleQuery = (newQuery) => {
    if (newQuery === "") {
      setSearchParams({});
    } else {
      setSearchParams({ query: newQuery });
    }
  };

  useEffect(() => {
    setError(null);
    setLoading(true);
    if (query.trim()) {
      const getMoviesQuery = async () => {
        try {
          const results = await searchMovies(query);
          setMovies(results);
        } catch {
          setError("Failed!");
        } finally {
          setLoading(false);
        }
      };
      getMoviesQuery();
    } else {
      setLoading(false);
      setMovies([]);
    }
  }, [query]);

  return (
    <div className={s.wrapp}>
      <SearchForm handleQuery={handleQuery} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;