import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  // add initial state = []
  const initialState = {
    todos: [{ id: "1", title: " Выучить реакт native" }],
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title });
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Deleting an item",
      `Are you sure want to delete ${todo.title}`,
      [
        {
          text: "Cancellation",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          //change of state
          onPress: () => {
           changeScreen(null);
            // prev is array. array have method filter(). If  todo.id === id. I delete element
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
    changeScreen(null);
    dispatch({ type: REMOVE_TODO, id });
  };
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, removeTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
