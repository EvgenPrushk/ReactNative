import React from "react";
import { ScreenContext } from "./screenContext";
import { ScreenReducer } from "./screenReducer";

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(ScreenReducer, null);

  const changeScreen = (id) => dispatch({ type: CHANGE_SCREEN, payload: id });
  return (
    <ScreenContext.Provider value={{ changeScreen, todoId: state }}>
      {children}
    </ScreenContext.Provider>
  );
};
