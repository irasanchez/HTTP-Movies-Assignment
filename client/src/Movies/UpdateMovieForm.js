import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialState = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
  id: 0
};

const UpdateMovieForm = props => {
  const [formState, setformState] = useState(initialState);

  const { id } = useParams();
  const { push } = useHistory();

  const handleChange = e => {
    setformState({
      ...formState, // copy in unchanged items
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    // When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formState)
      .then(res => {
        // make form blank again
        setformState(initialState);
        // get the updated list that has my edits
        // gets data from/for App.js
        props.getMovieData();
        // send user back to wherever the list is being shown
        push("/");
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const movieToUpdate = props.movies.find(movie => movie.id == id);
    if (movieToUpdate) {
      setformState(movieToUpdate);
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        name="title"
        type="text"
        value={formState.title}
        onChange={handleChange}
      />
      <label>Director</label>
      <input
        name="director"
        type="text"
        value={formState.director}
        onChange={handleChange}
      />
      <label>Metascore</label>
      <input
        name="metascore"
        type="text"
        value={formState.metascore}
        onChange={handleChange}
      />
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default UpdateMovieForm;
