import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";
//import { useParams } from "react-router-dom";

const App = () => {
  // on the top of the screen
  const [savedList, setSavedList] = useState([]);
  // main state that i actually care about
  const [movieList, setMovieList] = useState([]);

  const getMovieData = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieData(); //defined above
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieData={getMovieData} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm movies={movieList} getMovieData={getMovieData} />
      </Route>
    </>
  );
};

export default App;
