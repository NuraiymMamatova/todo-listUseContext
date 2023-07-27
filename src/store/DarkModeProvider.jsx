import { createContext } from "react";

export const DarkModeContext = createContext("");

export const DarkModeProvider = ({ value, children }) => {
  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
