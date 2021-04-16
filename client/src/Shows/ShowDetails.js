import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import styled from "styled-components";

const moment = require("moment");

export const ShowDetails = () => {
  const [show, setShow] = useState(null);
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
  }, []);

  console.log(show);
  return show ? (
    <Wrapper>
      <PosterSection>
        <Frame
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.poster_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Section1>
            <div style={{ opacity: "0.6", fontStyle: "italic" }}>
              {moment(show.first_air_date).format("YYYY")}
            </div>
            <Genres>
              {show.genres.map((genre) => {
                return <Genre>{genre["name"]}</Genre>;
              })}
            </Genres>
          </Section1>
        </Frame>
      </PosterSection>
      <DescriptionSection>
        <div
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundPositionY: "20%",
            height: "20%",
          }}
        >
          <Title>
            <h3>{show.name}</h3>
            {show.tagline && <h4>"{show.tagline}"</h4>}
          </Title>
        </div>
        <div>
          <p>{show.overview}</p>
        </div>
      </DescriptionSection>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 120px 100px 0 100px;
  position: relative;
`;

const PosterSection = styled.div`
  width: 502px;
`;

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

const Frame = styled.div`
  position: relative;
  width: 500px;
  height: 750px;
  border: 2px solid var(--secondary-user-color);
`;

const Section1 = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
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
  justify-content: space-evenly;
  align-items: center;
  margin: 0 5px;
  padding: 15px 0 0 0;
`;

const Genre = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 5px;
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
