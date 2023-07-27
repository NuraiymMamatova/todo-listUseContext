import React from "react";
import { styled } from "styled-components";

const Button = ({
  bgColor,
  children,
  padding = "5px 10px",
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      {...rest}
      bgcolor={bgColor}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  border-radius: 13px;
  padding: ${(p) => p.padding};
  background-color: ${(p) => p.bgcolor};
  color: #fff;
  border: none;
  font-size: medium;
  height: 5vh;
  vertical-align: middle;
  cursor: pointer;
`;
