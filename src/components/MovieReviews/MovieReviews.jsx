import { fetchMovieReviews } from "../../Api/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieReviews = ({ initialReviews = [] }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true); 
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    
    if (!initialReviews.length) {
      getReviews();
    }
  }, [movieId, initialReviews]);

  
  if (error) {
    return <p>{error}</p>;
  }

  
  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p><strong>{review.author}</strong></p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
