import { fetchMovieCredits, getImageUrl } from "../../Api/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const getCast = async () => {
      setLoading(true); 
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        setError("Failed to fetch cast information. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    getCast();
  }, [movieId]);

 
  if (error) {
    return <p className={css.errorMessage}>{error}</p>;
  }

  
  if (loading) {
    return <p className={css.loadingMessage}>Loading cast information...</p>;
  }

 
  if (cast.length === 0) {
    return <p className={css.noCastMessage}>No cast information available.</p>;
  }

  return (
    <div>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? getImageUrl(actor.profile_path)
                  : "/placeholder-image.png" 
              }
              alt={actor.name}
              className={css.castImage}
            />
            <p>{actor.name}</p>
            <p>
              <strong>Character:</strong> {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
