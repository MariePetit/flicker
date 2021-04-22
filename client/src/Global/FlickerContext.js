import React, { createContext, useState, useEffect } from "react";

export const FlickerContext = createContext(null);
export const FlickerProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [linkedUser, setLinkedUser] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [movieGenres, setMovieGenres] = useState(null);
  const [showGenres, setShowGenres] = useState(null);
  const [shows, setShows] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged-in") === "true") {
      fetch(`/user/${localStorage.getItem("current-user-id")}`).then((res) => {
        res.json().then((data) => {
          setCurrentUser(data.data);
        });
      });
    }
  }, [updatingUser]);

  useEffect(() => {
    fetch("/popular-movies")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setPopularMovies(json.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/movie-genres")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setMovieGenres(json.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/show-genres")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setShowGenres(json.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/shows")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setShows(json.data);
        }
      });
  }, []);

  return (
    <FlickerContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updatingUser,
        setUpdatingUser,
        popularMovies,
        movieGenres,
        showGenres,
        shows,
        linkedUser,
        setLinkedUser,
      }}
    >
      {children}
    </FlickerContext.Provider>
  );
};

export default FlickerContext;
