import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import { DarkModeContext } from "../store/DarkModeProvider";
import Button from "./UI/Button";

const Modal = ({ onDeleteTodo, toggleIsFormShow }) => {
  const { darkMode } = useContext(DarkModeContext);
  console.log(darkMode);

  return ReactDOM.createPortal(
    <Backdrop onClick={toggleIsFormShow}>
      <StyledModal darkmode={darkMode}>
        <h2>Вы уверены, что хотите удалить эту задачу?</h2>
        <ButtonsWrapper>
          <Button
            bgColor={darkMode ? "#00d30f" : "#00bf63"}
            onClick={onDeleteTodo}
          >
            ДА
          </Button>
          <Button
            bgColor={darkMode ? "#f01215" : "#ff5757"}
            onClick={toggleIsFormShow}
          >
            ОТМЕНА
          </Button>
        </ButtonsWrapper>
      </StyledModal>
    </Backdrop>,
    document.getElementById("modals")
  );
};

export default Modal;

const StyledModal = styled.div`
  background-color: ${(p) => (p.darkmode ? "#002b64" : "#fff")};
  padding: 20px;
  width: 30%;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${(p) => p.darkmode && "#fff"};
`;

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;
