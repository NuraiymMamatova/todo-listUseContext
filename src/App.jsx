import { useEffect, useReducer, useRef, useState } from "react";
import { styled } from "styled-components";
import "./App.css";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { DarkModeProvider } from "./store/DarkModeProvider";
import { DispatchProvider } from "./store/DispatchProvider";
import { TodoProvider } from "./store/TodoProvider";

const reducer = (prevState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "ADD":
      return { ...prevState, todos: payload };
    case "IS_ONLOAD":
      return { ...prevState, onLoading: payload };
    case "TODO_COMPLETED":
      return { ...prevState, completed: payload };
    case "TODO_UNFULFILLED":
      return { ...prevState, unfulfilled: payload };
    case "TOTAL":
      return { ...prevState, total: prevState.todos.length };
    default:
      return prevState;
  }
};

const initialState = {
  todos: [],
  total: 0,
  unfulfilled: 0,
  completed: 0,
};

const onAddButton = async (dispatch, titleRef) => {
  try {
    await fetch("https://todo-fa4ee-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify({
        title: titleRef.current.value,
        completed: false,
      }),
    });
  } catch (error) {
    console.log(error);
  }
  getTodos(dispatch);
};

const getTodos = async (dispatch) => {
  dispatch({ type: "IS_ONLOAD", payload: true });
  try {
    const response = await fetch(
      "https://todo-fa4ee-default-rtdb.firebaseio.com/todo.json"
    );
    const result = await response.json();
    const todos = result
      ? Object.entries(result).map(([id, todo]) => {
          return {
            id,
            ...todo,
          };
        })
      : [];
    dispatch({ type: "IS_ONLOAD", payload: false });
    dispatch({ type: "ADD", payload: todos });
    dispatch({ type: "TOTAL" });
    dispatch({
      type: "TODO_COMPLETED",
      payload: todos.filter((todo) => todo.completed).length,
    });
    dispatch({
      type: "TODO_UNFULFILLED",
      payload: todos.filter((todo) => !todo.completed).length,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (dispatch, id) => {
  try {
    await fetch(
      `https://todo-fa4ee-default-rtdb.firebaseio.com/todo/${id}.json`,
      { method: "DELETE" }
    );
  } catch (error) {
    console.log(error);
  }
  getTodos(dispatch);
};

const updateTodo = async (dispatch, id, title, completed) => {
  try {
    await fetch(
      `https://todo-fa4ee-default-rtdb.firebaseio.com/todo/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          title,
          completed,
        }),
      }
    );
    getTodos(dispatch);
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const titleRef = useRef("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem("MODE")));
    getTodos(dispatch);
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const toggle = () => {
    setDarkMode((prev) => {
      localStorage.setItem("MODE", JSON.stringify(!darkMode));
      return !prev;
    });
  };

  if (state.onLoading) {
    return (
      <LoadingImageBox>
        <img
          src="https://assets-global.website-files.com/5c7fdbdd4e3feeee8dd96dd2/6134707265a929f4cdfc1f6d_5.gif"
          alt="loading gif"
        />
      </LoadingImageBox>
    );
  }

  return (
    <StyledApp>
      <DarkModeProvider value={{ darkMode, toggle }}>
        <TodoProvider
          value={{
            total: state.total,
            unfulfilled: state.unfulfilled,
            completed: state.completed,
          }}
        >
          <Header />
          <DispatchProvider value={{ dispatch }}>
            <MainContainer darkmode={darkMode}>
              <StyledForm>
                <label htmlFor="main-heading">
                  <MainHeading darkmode={darkMode}>TODO-LIST</MainHeading>
                </label>
                <StyledInputForTitle
                  id={"main-heading"}
                  placeholder={"Enter new todo..."}
                  ref={titleRef}
                />
                <Button
                  bgColor={"#e2306c"}
                  onClick={() => onAddButton(dispatch, titleRef)}
                  onKeyDown={() => onAddButton(dispatch, titleRef)}
                  padding={"5px 8px"}
                >
                  ADD
                </Button>
              </StyledForm>

              {state.todos.length ? (
                <TodoList>
                  {state.todos.map((todo) => (
                    <TodoItem
                      {...todo}
                      key={todo.id}
                      deleteTodo={deleteTodo}
                      onUpdateTodo={updateTodo}
                    />
                  ))}
                </TodoList>
              ) : (
                <NotFoundBox>
                  <img
                    src="https://media.tenor.com/CW3dv0a1Hf4AAAAC/mission-complete-spongebob.gif"
                    alt="tasks not found"
                  />
                  <h3>Tasks are done!</h3>
                </NotFoundBox>
              )}
            </MainContainer>
          </DispatchProvider>
        </TodoProvider>
      </DarkModeProvider>
    </StyledApp>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: ${(p) => (p.darkmode ? "#002b64" : "white")};
  width: 600px;
  border-radius: 15px;
  flex-direction: column;
`;

const StyledApp = styled.div`
  background-color: #68c5ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const MainHeading = styled.h1`
  color: ${(p) => (p.darkmode ? "#fff" : "#004aad")};
  padding: 20px;
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 10px;
`;

const StyledForm = styled.div`
  text-align: center;
  & > label {
    color: #004aad;
  }
  & > button {
    width: 15%;
  }
`;

const StyledInputForTitle = styled(Input)`
  outline: none;
  border: 1px solid #004aad;
  padding: 5px;
  width: 20rem;
`;

const LoadingImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #474a51;
  & > img {
    object-fit: cover;
    width: 30%;
  }
`;
