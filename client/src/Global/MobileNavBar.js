import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import styled from "styled-components";
import FlickerContext from "./FlickerContext";
import logo from "../assets/flicker-logo.png";
import { FiMenu, FiUser } from "react-icons/fi";

const MobileNavBar = () => {
  const { currentUser, setCurrentUser } = useContext(FlickerContext);
  const history = useHistory();

  const onClick = () => {
    if (currentUser) {
      setCurrentUser(null);
      localStorage.setItem("current-user-email", "");
      localStorage.setItem("current-user-id", "");
      localStorage.setItem("logged-in", "false");
      history.push("/");
    } else {
      history.push("/log-in");
    }
  };

  return (
    <Wrapper>
      <HeaderTop>
        <NavSection>
          <HomeBtn to="/">
            <Logo src={logo} />
          </HomeBtn>
        </NavSection>
        <NavSection>
          {currentUser ? (
            <UserSection>
              <Icon to="/profile">
                <FiUser />
              </Icon>
            </UserSection>
          ) : (
            <Icon to="/login">
              <FiUser />
            </Icon>
          )}

          {currentUser && (
            <NavMenu>
              <FiMenu size="52" />
              <nav>
                <Link to="/movies">Movies</Link>
                <Link to="/shows">Shows</Link>
                <Link to="/watchlists">Watchlists</Link>
                <Button onClick={onClick}>
                  {currentUser ? "Sign out" : "Sign In"}
                </Button>
              </nav>
            </NavMenu>
          )}
        </NavSection>
      </HeaderTop>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 2;
  height: 95px;
  width: 100vw;
  background-color: #232323;
  border-bottom: 3px solid var(--primary-user-color);
  /* box-shadow: 0px 10px 20px -15px #333; */

  &:hover {
    h1 {
      opacity: 100;
    }
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const HomeBtn = styled(NavLink)`
  font-size: 30px;
  color: var(--primary-user-color);
`;

const Logo = styled.img`
  height: 55px;
  width: 60px;
  display: flex;
  align-items: center;
`;

//----USER LOG-IN BTN----
const Icon = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--secondary-color);
  font-size: 2rem;
  padding: 6px;
  margin: 0 5px;
  transition: 0.25s ease-in-out;

  &:hover {
    color: var(--secondary-user-color);
    border-radius: 50%;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 20px;
  }
`;

//-----NAVIGATION------
const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: 0.25s ease-in 1s ease-out;
  padding-right: 5px;

  svg {
    margin-top: 3px;
    padding: 6px;
    transition: 0.25s ease-in-out;

    &:hover {
      color: var(--third-user-color);
      border-radius: 50%;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    width: 100vw;
    top: 95px;
    z-index: 3;
    padding: 20px;
    transition: 0.3s ease-in-out;
    transition-delay: 0.2s; // helps to delay the dropdown from appearing/disappearing
    background-color: #232323;
  }

  &:hover {
    border-radius: 50%;
    cursor: pointer;

    nav {
      visibility: visible;
      opacity: 100;
    }
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  appearance: none;
  outline: none;
  border: none;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 92, 0, 1) 15%,
    rgba(244, 159, 10, 1) 85%,
    rgba(239, 202, 8, 1) 100%
  );
  color: white;
  font-weight: bold;
  font-family: "Fira Sans", sans-serif;
  font-size: 22px;
  padding: 10px 12px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
  }

  &:active {
    background: rgba(239, 202, 8, 1);
  }
`;

//---REUSED STYLED COMPONENTS---
const NavSection = styled.div`
  display: flex;
  align-content: center;
  padding: 20px 0;
`;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s ease-in-out;
  color: white;
  font-size: 22px;
  padding: 10px;

  &:hover {
    color: var(--third-user-color);
    background: var(--accent-color);
    border-radius: 10px;
  }
`;

export default MobileNavBar;
