import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMoviesReview } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    setError(null);
    const getReview = async () => {
      try {
        const data = await getMoviesReview(movieId);
        setReviews(data);
      } catch {
        setError("Failed reviews");
      }
    };
    getReview();
  }, [movieId]);

  if (!reviews || reviews.length === 0) {
    return <p>No reviews</p>;
  }
  return (
    <div className={s.wrapp}>
      <h3>Reviews:</h3>
      {error && <p>{error}</p>}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p className={s.author}>{review.author}</p>
            <p className={s.text}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieReviews;