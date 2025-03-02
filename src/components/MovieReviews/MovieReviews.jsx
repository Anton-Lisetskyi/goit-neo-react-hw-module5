import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/themoviedb";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      console.log("No Movie ID");
      return;
    }

    async function fetchData() {
      try {
        console.log("Fetching reviews for movie ID:", movieId);
        setLoading(true);
        setError(false);

        const reviews = await fetchMovieReviews(movieId);
        console.log("Fetched reviews:", reviews);
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {reviews.length > 0 ? (
        <ul className={css.reviews}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewsItem}>
              <p className={css.author}>{review.author}</p>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No reviews</p>
      )}
    </div>
  );
};

export default MovieReviews;
