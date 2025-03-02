import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast, getImageUrl } from "../../api/themoviedb";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div className={css.cast}>
      {loading && <Loader />}
      {error && <Error />}
      {cast.length > 0 ? (
        cast.map((actor) => {
          const imageUrl = actor.profile_path
            ? getImageUrl(actor.profile_path)
            : null;

          return (
            <li key={actor.id} className={css.castItem}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={actor.name}
                  width="150"
                  className={css.castImg}
                />
              ) : (
                <p className={css.noImageText}>No Image</p>
              )}
              <p className={css.castName}>{actor.name}</p>
              <p className={css.character}>
                {actor.character
                  ? `Character: ${actor.character}`
                  : "Character: No character"}
              </p>
            </li>
          );
        })
      ) : (
        <p>No cast</p>
      )}
    </div>
  );
};

export default MovieCast;
