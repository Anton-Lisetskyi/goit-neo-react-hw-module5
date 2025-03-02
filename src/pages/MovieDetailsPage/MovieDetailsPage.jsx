import { useEffect, useState, useRef } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../api/themoviedb";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import BackButton from "../../components/BackButton/BackButton";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const savedLocation = useRef(location.state);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.log("error", error);
        setError("Something went wrong while fetching the movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const handleBack = () => {
    navigate(savedLocation.current?.from || "/");
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!movie) return null;

  return (
    <div className={css.container}>
      <BackButton onClick={handleBack} />
      <div className={css.descriptionText}>
        <img
          src={getImageUrl(movie.poster_path) || "/placeholder.png"}
          alt={movie.title || "No poster available"}
          className={css.poster}
        />
        <div>
          <h2 className={css.title}>
            {movie.title} ({movie.release_date?.slice(0, 4) || "N/A"})
          </h2>
          <p className={css.userScore}>
            User score: {movie.vote_average || "N/A"}
          </p>
          <p className={css.sectionTitle}>Overview</p>
          <p>{movie.overview || "No overview available."}</p>
          <p className={css.sectionTitle}>Genres</p>
          <p>{movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}</p>
        </div>
      </div>
      <p className={css.underImage}>Additional information</p>
      <ul className={css.extraInfoLinks}>
        <li>
          <Link to="cast" state={{ from: location }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
