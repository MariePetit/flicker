import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { FlickerContext } from "../Global/FlickerContext";

export const Genres = () => {
  const { genres } = useContext(FlickerContext);

  return genres ? (
    <Wrapper>
      <ItemList>
        {genres.map((genre) => {
          return (
            <Item to={`/genres/${genre.name.toLowerCase()}`} genre={genre}>
              {genre.name}
            </Item>
          );
        })}
      </ItemList>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemList = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Item = styled(NavLink)`
  border: 1px solid var(--secondary-user-color);
  border-radius: 8px;
  margin: 20px;
  padding: 60px 80px;
  font-size: 24px;
  font-weight: normal;

  &:hover {
    cursor: pointer;
  }
`;
