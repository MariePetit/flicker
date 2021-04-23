import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";

export const LogIn = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const { setCurrentUser, setLinkedUser } = useContext(FlickerContext);
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  //post to send back to backend formData /
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/log-user", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { status } = data;
        if (status === 200) {
          alert("Welcome!");
          setCurrentUser(data.data);
          localStorage.setItem("current-user-email", data.data.email);
          localStorage.setItem("current-user-id", data.data._id);
          localStorage.setItem("logged-in", "true");
          setLinkedUser(data.data.linkedUser[0]);
          history.push("/");
        } else {
          alert("User Not Found");
        }
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div>
          <input
            name="email"
            placeholder="Email"
            type="text"
            onChange={(ev) =>
              setFormData({ ...formData, email: ev.target.value })
            }
            required
            ref={ref}
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            onChange={(ev) =>
              setFormData({ ...formData, password: ev.target.value })
            }
            required
          />
        </div>
        <Button type="submit">Confirm</Button>
      </Form>
      <CreateAccount>
        Don't have an account?
        <Link to="/create-account">Sign Up!</Link>
      </CreateAccount>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 310px;
  margin: auto;
  padding: 20px 30px;
  border: 2px solid var(--primary-user-color);
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  h2 {
    margin: 0 0 10px 0;
    font-size: 20px;
  }

  input {
    margin: 5px;
    padding: 5px;
    font-size: 16px;
    border-radius: 5px;
  }

  button {
    margin: 20px 0px;
    border-radius: 5px;
  }
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

  &:active {
    background: rgba(239, 202, 8, 1);
  }
`;

const CreateAccount = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-style: italic;
`;

const Link = styled(NavLink)`
  margin-left: 10px;
  font-weight: bold;
  font-style: normal;
  color: var(--secondary-user-color);
  transition: 0.5s ease-in-out;

  &:hover {
    color: var(--third-user-color);
  }
`;
