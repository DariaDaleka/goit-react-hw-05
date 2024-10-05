import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  useParams,
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

const MovieCast = React.lazy(() =>
  import("../../components/MovieCast/MovieCast")
);
const MovieReviews = React.lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        console.log("Fetching details for movieId:", movieId); // Отладочный лог
        const movieData = await getMovieDetails(movieId);
        console.log("Fetched movie data:", movieData); // Отладочный лог
        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details. Please try again later.");
      }
    };
  
    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(locationRef.current?.from || "/movies");
  };

  if (error) {
    return <p>{error}</p>; // Обработка ошибок
  }

  if (!movie) {
    return <p>Loading...</p>; // Или можно заменить на индикатор загрузки
  }

  const userScore = (movie.vote_average * 10).toFixed(0);

  return (
    <div className={css.movieDetailsPage}>
      <button className={css.button} onClick={handleGoBack}>
        Go back
      </button>
      <div className={css.movieDetailsBox}>
        <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
        <div className={css.box}>
          <h1>{movie.title}</h1>
          <p>User Score: {userScore}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <h3>Additional information</h3>
      <ul className={css.listDetails}>
        <li>
          <Link
            to={`/movies/${movieId}/cast`}
            state={{ from: locationRef.current?.from || "/" }}
          >
            Cast
          </Link>
        </li>
        <li>
          <Link
            to={`/movies/${movieId}/reviews`}
            state={{ from: locationRef.current?.from || "/" }}
          >
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
