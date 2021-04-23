import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MediaQuery from "react-responsive";

import styled from "styled-components";

const moment = require("moment");

export const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState(null);
  const [topActors, setTopActors] = useState(null);

  let specificShow = useParams();

  useEffect(() => {
    fetch("/shows/:id", {
      method: "POST",
      body: JSON.stringify({ ...specificShow }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setShow(json.data);
        }
      });
  }, [specificShow]);

  useEffect(() => {
    fetch(`/show-credits/${specificShow.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setCast(json.data.cast);
        }
      });
  }, [specificShow]);

  useEffect(() => {
    if (cast) {
      console.log(cast.length);
      setTopActors(cast.slice(0, 6));
    }
  }, [cast]);

  useEffect(() => {
    if (topActors) {
      console.log(topActors);
    }
  }, [topActors]);

  return show && cast ? (
    <>
      {/*---------------------------------- DESKTOP -------------------------------------*/}
      <MediaQuery minWidth={1049}>
        <DesktopWrapper>
          <PosterSection>
            <Frame
              style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.poster_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <MovieInfo>
                <div style={{ opacity: "0.6", fontStyle: "italic" }}>
                  {moment(show.first_air_date).format("YYYY")}
                </div>
                <Genres>
                  {show.genres.map((genre) => {
                    return <Genre>{genre["name"]}</Genre>;
                  })}
                </Genres>
              </MovieInfo>
            </Frame>
          </PosterSection>

          <DescriptionSection>
            <Backdrop
              style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundPositionY: "20%",
                height: "150px",
              }}
            >
              <Title>
                <h3>{show.name}</h3>
                {show.tagline && <h4>"{show.tagline}"</h4>}
              </Title>
            </Backdrop>
            <div>
              <p>{show.overview}</p>
            </div>

            <Cast>
              <h3>Cast</h3>
              <ActorsSection>
                {topActors ? (
                  topActors.map((actor) => {
                    console.log(actor);
                    return (
                      <ActorCard
                        style={{
                          backgroundImage: `url(http://image.tmdb.org/t/p/w500${actor.profile_path})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        <ActorName>
                          <h4>{actor.name}</h4>
                        </ActorName>
                      </ActorCard>
                    );
                  })
                ) : (
                  <div>Oops, something went wrong.</div>
                )}
              </ActorsSection>
            </Cast>
          </DescriptionSection>
        </DesktopWrapper>
      </MediaQuery>

      {/*------------------------------------ MOBILE -------------------------------------*/}
      <MediaQuery maxWidth={1048}>
        <MobileWrapper>
          <MobileBackdrop
            style={{
              backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.backdrop_path})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundPositionY: "20%",
              height: "100px",
            }}
          >
            <Title>
              <h3>{show.name}</h3>
              {show.tagline && <h4>"{show.tagline}"</h4>}
            </Title>
          </MobileBackdrop>
          <PosterSection>
            <MobilePosterFrame
              style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.poster_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <MovieInfo>
                <div style={{ opacity: "0.6", fontStyle: "italic" }}>
                  {moment(show.first_air_date).format("YYYY")}
                </div>
                <Genres>
                  {show.genres.map((genre) => {
                    return <Genre>{genre["name"]}</Genre>;
                  })}
                </Genres>
              </MovieInfo>
            </MobilePosterFrame>
          </PosterSection>

          <div>
            <p>{show.overview}</p>
          </div>

          <Cast>
            <h3>Cast</h3>
            <ActorsSection>
              {topActors ? (
                topActors.map((actor) => {
                  console.log(actor);
                  return (
                    <ActorCard
                      style={{
                        backgroundImage: `url(http://image.tmdb.org/t/p/w500${actor.profile_path})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <ActorName>
                        <h4>{actor.name}</h4>
                      </ActorName>
                    </ActorCard>
                  );
                })
              ) : (
                <div>Oops, something went wrong.</div>
              )}
            </ActorsSection>
          </Cast>
        </MobileWrapper>
      </MediaQuery>
    </>
  ) : (
    <div>Loading...</div>
  );
};

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 120px 20px 0 20px;
  position: relative;
  width: 100vw;
`;

const PosterSection = styled.div``;

const DescriptionSection = styled.div`
  padding: 0 50px 30px 50px;

  h3 {
    font-size: 26px;
    text-align: center;
    margin: 0 0 10px 0;
  }

  h4 {
    font-size: 20px;
    font-style: italic;
    font-weight: normal;
    text-align: center;
  }

  p {
    font-size: 18px;
    font-weight: normal;
    padding: 30px 0;
  }
`;

const Backdrop = styled.div`
  margin-bottom: 20px;
`;

const Frame = styled.div`
  position: relative;
  width: 500px;
  height: 750px;
  border: 2px solid var(--secondary-user-color);
`;

const MovieInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  padding: 20px 0 30px 0;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 0 5px;
  padding: 10px 0 0 0;
`;

const Genre = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 3px;
  font-size: 20px;
  opacity: 0.7;
`;

const Title = styled.div`
  border: 2px solid var(--secondary-user-color);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  height: 100%;
`;

const Cast = styled.div``;

const ActorsSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActorCard = styled.div`
  width: 200px;
  height: 300px;
  margin: 10px;
  border: 2px solid var(--secondary-user-color);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
`;

const ActorName = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  z-index: 1;

  h4 {
    font-style: normal;
  }
`;

// -------------------------------------------- MOBILE -------------------------------

const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;

  h3 {
    font-size: 26px;
    text-align: center;
    margin: 0 0 10px 0;
  }

  h4 {
    font-size: 20px;
    font-style: italic;
    font-weight: normal;
    text-align: center;
  }

  p {
    font-size: 18px;
    font-weight: normal;
    padding: 30px 0;
  }
`;

const MobilePosterFrame = styled.div`
  width: 300px;
  height: 450px;
  border: 2px solid var(--secondary-user-color);
  position: relative;
`;

const MobileBackdrop = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
