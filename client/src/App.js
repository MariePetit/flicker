import GlobalStyles from "./Global/GlobalStyles";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./Global/NavBar";
import { CreateAccount } from "./Homepage/CreateAccount";
import { Homepage } from "./Homepage/Homepage";
import { LogIn } from "./Homepage/LogIn";
import styled from "styled-components";
import { MovieGenres } from "./Movies/MovieGenres";
import { SpecificGenre, SpecificMovieGenre } from "./Movies/SpecificMovieGenre";
import { TvShows } from "./Shows/TvShows";
import { ShowGenres } from "./Shows/ShowGenres";
import { MovieDetails } from "./Movies/MovieDetails";
import { WatchlistsPage } from "./Watchlists/WatchlistsPage";
import { ShowDetails } from "./Shows/ShowDetails";
import { Profile } from "./Profile/Profile";
import { FlickerPartnerProfile } from "./Profile/FlickerPartnerProfile";
import { SearchUser } from "./Profile/SearchUser";
import { PopularMovies } from "./Movies/PopularMovies";
import { SpecificShowGenre } from "./Shows/SpecificShowGenre";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavBar />
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/create-account">
            <CreateAccount />
          </Route>
          <Route exact path="/log-in">
            <LogIn />
          </Route>
          <Route exact path="/movies">
            <MovieGenres />
            <PopularMovies />
          </Route>
          <Route exact path="/shows">
            <ShowGenres />
            <TvShows />
          </Route>
          <Route exact path="/show-genres/:name">
            <ShowGenres />
            <SpecificShowGenre />
          </Route>
          <Route exact path="/watchlists">
            <WatchlistsPage />
          </Route>
          <Route exact path="/movie-genres/:name">
            <MovieGenres />
            <SpecificMovieGenre />
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/shows/:id">
            <ShowDetails />
          </Route>
          <Route exact path="/link-account">
            <SearchUser />
          </Route>
          <Route exact to="/flicker-partner">
            <FlickerPartnerProfile />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  margin-top: 100px;
`;
export default App;
