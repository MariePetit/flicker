import React from "react";

import styled from "styled-components";

export const SmallCardAlt = ({ item }) => {
  return (
    <Wrapper
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/w500${item.poster_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Header>
        <h4>{item.title || item.name}</h4>
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  height: 450px;
  margin: 10px;
  border: 2px solid var(--secondary-user-color);
  border-radius: 8px;
  transition: 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  z-index: 1;

  h4 {
    padding: 0 5px;
    color: white;
    text-align: center;
  }

  div {
    width: 100%;
  }
`;
