import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MediaQuery from "react-responsive";

import styled, { keyframes } from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import genresBackground from "../assets/genres-background.jpg";

export const Homepage = () => {
  const { currentUser, popularMovies, shows } = useContext(FlickerContext);
  const [randomMoviePoster, setRandomMoviePoster] = useState(null);
  const [randomShowPoster, setRandomShowPoster] = useState(null);

  useEffect(() => {
    if (popularMovies && shows) {
      setRandomMoviePoster(
        popularMovies[Math.floor(Math.random() * popularMovies.length - 1)]
      );
      setRandomShowPoster(shows[Math.floor(Math.random() * shows.length - 1)]);
    }
  }, [popularMovies, shows]);

  return (
    <>
      {/* ----------------------- MAX WIDTH = 1048 ------------------------------*/}
      <MediaQuery minWidth={1049}>
        <Wrapper>
          {currentUser && (
            <>
              <div>
                <LogInText1>
                  Oh! Hello there, {currentUser.firstName}!
                </LogInText1>
                <LogInText2>What would you like to browse today?</LogInText2>
              </div>
              {randomMoviePoster && randomShowPoster ? (
                <CardSection>
                  <Card1
                    to="/movies"
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/w500${randomMoviePoster.poster_path})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Movies</CardName>
                  </Card1>
                  <Card2
                    to="/shows"
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/w500${randomShowPoster.poster_path})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Shows</CardName>
                  </Card2>
                  <Card3
                    to="/watchlists"
                    style={{
                      backgroundImage: `url(${genresBackground})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Watchlists</CardName>
                  </Card3>
                </CardSection>
              ) : (
                <div>Loading...</div>
              )}
            </>
          )}
          {!currentUser && (
            <Section>
              <Link to="/log-in">Sign in</Link>
              <Link to="/create-account">Create an account</Link>
            </Section>
          )}
        </Wrapper>
      </MediaQuery>

      {/* ------------------ MAX WIDTH = 1048 ----------------------------- */}
      <MediaQuery maxWidth={1048}>
        <Wrapper>
          {currentUser && (
            <>
              <div>
                <LogInText1>
                  Oh! Hello there, {currentUser.firstName}!
                </LogInText1>
                <LogInText2>What would you like to browse today?</LogInText2>
              </div>
              {randomMoviePoster && randomShowPoster ? (
                <MobileCardSection>
                  <Card1
                    to="/movies"
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/w500${randomMoviePoster.poster_path})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Movies</CardName>
                  </Card1>
                  <Card2
                    to="/shows"
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/w500${randomShowPoster.poster_path})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Shows</CardName>
                  </Card2>
                  <Card3
                    to="/watchlists"
                    style={{
                      backgroundImage: `url(${genresBackground})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <CardName>Watchlists</CardName>
                  </Card3>
                </MobileCardSection>
              ) : (
                <div>Loading...</div>
              )}
            </>
          )}
          {!currentUser && (
            <Section>
              <Link to="/log-in">Sign in</Link>
              <Link to="/create-account">Create an account</Link>
            </Section>
          )}
        </Wrapper>
      </MediaQuery>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  top: 100px;
`;

const Link = styled(NavLink)`
  border: 1px solid var(--primary-user-color);
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
`;

const Section = styled.div`
  margin-top: 200px;
`;

const slideInFromTop1 = keyframes`
    0% {top: 0%; opacity: 0%}
    100% {top: 150px; opacity: 100%}
`;
const slideInFromTop2 = keyframes`
    0% {top: 0%; opacity: 0%}
    100% {top: 200px; opacity: 100%}
`;

const fadeIn = keyframes`
    0% {opacity: 0%}
    100% {opacity: 100%}
`;

const LogInText1 = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  animation-name: ${slideInFromTop1};
  animation-delay: 0.5s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
`;

const LogInText2 = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 30px;
  animation-name: ${slideInFromTop2};
  animation-delay: 1.3s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
`;

const CardSection = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MobileCardSection = styled.div`
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card1 = styled(NavLink)`
  border: 2px solid var(--primary-user-color);
  border-radius: 6px;
  width: 360px;
  height: 540px;
  margin: 20px 0;
  animation-name: ${fadeIn};
  animation-delay: 2.3s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

  &:hover {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 100;
      background-color: rgb(0, 0, 0, 0.85);
      height: 100%;
      font-size: 40px;
    }
  }
`;

const Card2 = styled(NavLink)`
  border: 2px solid var(--primary-user-color);
  border-radius: 6px;
  width: 360px;
  height: 540px;
  margin: 20px;
  animation-name: ${fadeIn};
  animation-delay: 2.5s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

  &:hover {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 100;
      background-color: rgb(0, 0, 0, 0.85);
      height: 100%;
      font-size: 40px;
    }
  }
`;

const Card3 = styled(NavLink)`
  border: 2px solid var(--primary-user-color);
  border-radius: 6px;
  width: 360px;
  height: 540px;
  margin: 20px 0;
  animation-name: ${fadeIn};
  animation-delay: 2.7s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

  &:hover {
    div {
      display: flex;
      align-items: center;
      justify-content: center;

      opacity: 100;
      background-color: rgb(0, 0, 0, 0.85);
      height: 100%;
      font-size: 40px;
    }
  }
`;

const CardName = styled.div`
  transition: 0.4s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  height: 100%;
  font-size: 40px;
`;
