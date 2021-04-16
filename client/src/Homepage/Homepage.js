import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import { PopularMovies } from "../Movies/PopularMovies";

export const Homepage = () => {
  const { currentUser } = useContext(FlickerContext);
  console.log(currentUser);
  return (
    <Wrapper>
      {currentUser && <PopularMovies />}
      {!currentUser && (
        <Section>
          <Link to="/log-in">Sign in</Link>
          <Link to="/create-account">Create an account</Link>
        </Section>
      )}
    </Wrapper>
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
