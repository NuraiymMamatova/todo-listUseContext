import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { DarkModeContext } from "../store/DarkModeProvider";
import { DispatchContext } from "../store/DispatchProvider";
import Modal from "./Modal";
import Button from "./UI/Button";

const TodoItem = ({ id, title, completed, onUpdateTodo, deleteTodo }) => {
  const [isFormShow, setIsFormShow] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const toggleIsFormShow = () => {
    setIsFormShow(!isFormShow);
  };

  const onDeleteTodo = (id) => {
    deleteTodo(dispatch, id);
    toggleIsFormShow();
  };

  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <StyledTodoItem darkmode={darkMode}>
        <TodoTitle completed={completed.toString()}>{title}</TodoTitle>
        <DeleteWithCheckboxWrapper>
          <CheckboxStyledInput
            onChange={() => onUpdateTodo(dispatch, id, title, !completed)}
            type="checkbox"
            checked={completed}
          />
          <Button
            bgColor={darkMode ? "#f01215" : "#ff5757"}
            onClick={toggleIsFormShow}
          >
            DELETE
          </Button>
        </DeleteWithCheckboxWrapper>
      </StyledTodoItem>
      {isFormShow && (
        <Modal
          onDeleteTodo={() => onDeleteTodo(id)}
          toggleIsFormShow={toggleIsFormShow}
        />
      )}
    </>
  );
};

export default TodoItem;

const StyledTodoItem = styled.li`
  background-color: ${(p) => (p.darkmode ? "#01142e" : "#1c93d2")};
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

const CheckboxStyledInput = styled.input.attrs({ type: "checkbox" })`
    display: flex;
    align-items: center;
    justify-content: center;

    &:checked {
      background-color: #00bf63;
      appearance: none;
      width: 12px;
      height: 12px;
      border: 1px solid gray;
    }

    &::after {
      font-weight: 900;
      content: "\2713";
      font-size: 8px;
      color: white;
    }
  `;

const TodoTitle = styled.p`
  text-decoration: ${(p) =>
    p.completed === "true" ? "line-through #e53b43" : "none"};
`;

const DeleteWithCheckboxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
