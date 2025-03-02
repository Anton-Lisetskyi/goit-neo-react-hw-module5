import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../../api/themoviedb";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = useCallback(
    async (query) => {
      if (query.trim() === "") {
        setError("Please enter a movie name.");
        setMovies([]);
        return;
      }

      setError("");

      try {
        const result = await searchMovies(query);

        if (result.length === 0) {
          setError("No movies found. Please try another search.");
          setMovies([]);
        } else {
          setMovies(result);
        }
      } catch (error) {
        console.log("error", error);
        setError("Something went wrong. Please try again later.");
        setMovies([]);
      }

      navigate(`?query=${query}`);
    },
    [navigate]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search).get("query") || "";
    setQuery(queryParams);

    if (queryParams) {
      handleSearch(queryParams);
    }
  }, [location.search, handleSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <Error message={error} />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
