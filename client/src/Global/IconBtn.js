import React, { useState } from "react";

import styled from "styled-components";

export const IconBtn = ({ children, size, color, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: size,
        height: size,
        color: isHovered ? color : "#FFFFFF",
      }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  outline: none;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  position: relative;
  transition: 0.15s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    opacity: 0;
  }

  &:focus:after,
  &:hover:after {
    opacity: 0.12;
  }
`;
