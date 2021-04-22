import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import styled from "styled-components";
import FlickerContext from "./FlickerContext";
import logo from "../assets/flicker-logo.png";

export const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(FlickerContext);
  const history = useHistory();

  const onClick = () => {
    if (currentUser) {
      setCurrentUser(null);
      history.push("/");
    } else {
      history.push("/log-in");
    }
  };

  return (
    <>
      <Wrapper>
        <NavSection>
          <Logo src={logo} />
          <HomeBtn to="/">Flicker</HomeBtn>
        </NavSection>
        {currentUser && (
          <NavSection>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/watchlists">Watchlists</Link>
          </NavSection>
        )}
        <NavSection>
          {currentUser && (
            <div>
              <h2>
                Hello there,{" "}
                <NavLink to="/profile">{currentUser.firstName}</NavLink>!
              </h2>
            </div>
          )}
          <Button onClick={onClick}>
            {currentUser ? "Sign out" : "Sign In"}
          </Button>
        </NavSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
  padding: 20px;
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #232323;
  z-index: 2;
  border-bottom: 3px solid var(--primary-user-color);
`;

const Logo = styled.img`
  height: 55px;
  width: 60px;
`;
const HomeBtn = styled(NavLink)`
  font-size: 30px;
  color: var(--primary-user-color);
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: white;
  margin: 0 30px;
`;

const Button = styled.button`
  appearance: none;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-left: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 92, 0, 1) 15%,
    rgba(244, 159, 10, 1) 85%,
    rgba(239, 202, 8, 1) 100%
  );
  color: white;
  font-weight: bold;
  font-family: "Fira Sans", sans-serif;
  font-size: 16px;
  padding: 10px 12px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
  }

  &:active {
    background: rgba(239, 202, 8, 1);
  }
`;
