import React, { useContext } from "react";
import { styled } from "styled-components";
import sun from "../assets/icons/sun-svgrepo-com.svg";
import { DarkModeContext } from "../store/DarkModeProvider";
import { TodoContext } from "../store/TodoProvider";
import Button from "./UI/Button";

const Header = () => {
  const { total, unfulfilled, completed } = useContext(TodoContext);
  const { toggle, darkMode } = useContext(DarkModeContext);

  return (
    <StyledHeader darkmode={darkMode}>
      <p style={{ color: darkMode ? "#fff" : "#004aad" }}>Всего: {total}</p>
      <p style={{ color: darkMode ? "#f01215" : "#ff6868" }}>
        Невыполненные: {unfulfilled}
      </p>
      <p style={{ color: darkMode ? "#00d60f" : "#00bf63" }}>
        Выполненные: {completed}
      </p>
      <Button className={"imgBtn"} onClick={toggle}>
        {darkMode ? (
          <img src={sun} alt="sun" width={"20px"} />
        ) : (
          <img
            src="https://static-00.iconduck.com/assets.00/moon-icon-512x512-fm9crgpt.png"
            alt="moon"
            width={"20px"}
          />
        )}
      </Button>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background-color: ${(p) => (p.darkmode ? "#002b64" : "#fff")};
  width: 600px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  border-radius: 15px;
  align-items: center;
`;
