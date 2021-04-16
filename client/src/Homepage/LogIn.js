import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";

export const LogIn = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const { setCurrentUser } = useContext(FlickerContext);
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  //post to send back to backend formData /
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch("/log-in", {
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px 30px;
  border: 2px solid var(--primary-user-color);
  border-radius: 10px;

  h2 {
    margin: 20px 0;
  }

  input {
    margin: 5px;
    padding: 5px;
    font-size: 14px;
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
