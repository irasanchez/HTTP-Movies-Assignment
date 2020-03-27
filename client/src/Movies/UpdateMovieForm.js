import React, { useState } from "react";

const UpdateMovieForm = props => {
  const [formState, setformState] = useState({
    title: "",
    director: "",
    metascore: null,
    stars: []
  });

  const handleChange = e => {
    setformState({
      ...formState, // copy in unchanged items
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        name="director"
        type="text"
        value={formState.director}
        onChange={handleChange}
      />
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
