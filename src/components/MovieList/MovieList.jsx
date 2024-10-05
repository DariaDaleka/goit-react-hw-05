import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  
  if (!movies?.length) {
    return <p>No movies found.</p>;
  }

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <NavLink
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <span>{movie.title || "Untitled Movie"}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
