import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieData }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  // fetch for individual item instead of relying on props
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    // - When the call comes back successfully, route the user to `/movies` where they will see the updated movie list without the deleted movie
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        //after deleting, get updated list
        getMovieData();
        // send user to the homepage to see updates
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const routeToUpdateMovieForm = event => {
    event.preventDefault();
    console.log("i should be routing!");
    history.push(`/update-movie/${movie.id}`);
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      {/* - Add a button in the movie component that routes you to your new route with the movie's id as the URL param */}
      <button onClick={routeToUpdateMovieForm}>Update Movie</button>
      <button onClick={() => deleteMovie(match.params.id)}>
        DELETE MOVIE 💣
      </button>
    </div>
  );
}

export default Movie;
