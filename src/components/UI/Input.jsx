import React, { forwardRef, useContext } from "react";
import { styled } from "styled-components";
import { DarkModeContext } from "../../store/DarkModeProvider";

const Input = forwardRef(({ id, type = "text", placeholder, checked }, ref) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <StyledInput
    darkmode={darkMode}
      id={id}
      type={type}
      placeholder={placeholder}
      checked={checked}
      ref={ref}
    />
  );
});

export default Input;

const StyledInput = styled.input`
  outline: none;
  border: 1px solid ${(p) => (p.darkmode ? "#68c5ff" : "#004aad")};
  padding: 5px;
  width: 15rem;
`;
