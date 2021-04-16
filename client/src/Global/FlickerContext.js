import React, { createContext, useState, useEffect } from "react";

export const FlickerContext = createContext(null);
export const FlickerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [shows, setShows] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    fetch("/account/:id")
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.profile);
      });
  }, []);

  useEffect(() => {
    fetch("/popular-movies")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setPopularMovies(json.data);
        }
      });
  }, [reFetch]);

  useEffect(() => {
    fetch("/genres")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setGenres(json.data);
        }
      });
  }, [reFetch]);

  useEffect(() => {
    fetch("/shows")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setShows(json.data);
        }
      });
  }, [reFetch]);

  return (
    <FlickerContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        reFetch,
        setReFetch,
        popularMovies,
        genres,
        shows,
      }}
    >
      {children}
    </FlickerContext.Provider>
  );
};

export default FlickerContext;
