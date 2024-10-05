import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../services/api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);
  const [loading, setLoading] = useState(false); // Новое состояние для загрузки
  const [error, setError] = useState(null); // Новое состояние для ошибок

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        setLoading(true); // Начинаем загрузку
        setError(null); // Сбрасываем ошибки
        try {
          const searchResults = await searchMovies(query);
          setMovies(searchResults);
        } catch (err) {
          console.error("Error fetching movies:", err);
          setError("Failed to fetch movies. Please try again later."); // Обработка ошибок
        } finally {
          setLoading(false); // Завершаем загрузку
        }
      } else {
        setMovies([]); // Сбрасываем список фильмов, если пустой запрос
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue });
  };

  return (
    <div className={css.moviesPage}>
      <form className={css.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>} {/* Индикатор загрузки */}
      {error && <p>{error}</p>} {/* Сообщение об ошибке */}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
