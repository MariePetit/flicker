import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";

export const SearchUser = () => {
  const { currentUser, setLinkedUser } = useContext(FlickerContext);
  const ref = useRef(null);
  const history = useHistory();
  const initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = (ev) => {
    console.log(formData);
    ev.preventDefault();
    fetch(`/link-user/${currentUser._id}`, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        console.log("otherUser", data.data.otherUser);
        const { status } = data;
        if (status === 202) {
          setLinkedUser(data.data.otherUser);
          history.push("/profile");
        } else {
          alert("User Not Found");
        }
      });
  };

  return (
    <Wrapper>
      <div>
        <h2>Who will be your flicker partner?</h2>
      </div>
      <Section>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter their email"
            ref={ref}
            onChange={(ev) =>
              setFormData({ ...formData, email: ev.target.value })
            }
            required
          ></Input>
          <Button type="submit">Search</Button>
        </form>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 100px 0 100px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Input = styled.input`
  appearance: none;
  outline: none;
  border: 2px solid transparent;
  border-radius: 6px;
  margin: 5px 2px;
  padding: 10px 12px;
  font-size: 16px;
  width: 250px;

  &:focus {
    border: 2px solid var(--primary-user-color);
  }
`;

const Button = styled.button`
  appearance: none;
  outline: none;
  border: none;
  border-radius: 6px;
  margin-left: 5px;
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
  padding: 12px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background: rgba(239, 202, 8, 1);
  }
`;
