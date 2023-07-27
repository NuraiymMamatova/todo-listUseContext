import { createContext } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ value, children }) => {
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
