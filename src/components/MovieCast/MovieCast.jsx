import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMoviesCredits } from "../../services/api";
import s from "./MovieCast.module.css";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(null);
    getMoviesCredits(movieId)
      .then(setCast)
      .catch(() => {
        setError("Failed to load cast. Please try again later!");
      });
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }
  if (cast.length === 0) {
    return <p>No cast available for this movie</p>;
  }

  return (
    <div className={s.wrapp}>
      <h3>Actors:</h3>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={s.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              className={s.img}
            />
        
            <p className={s.text}>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieCast;
