import React, { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";

export const TodoState = ({ children }) => {
  // add initial state = []
  const initialState = {
    todos: [{ id: "1", title: " Выучить реакт native" }],
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ todos: state.todos }}>
      {children}
    </TodoContext.Provider>
  );
};
