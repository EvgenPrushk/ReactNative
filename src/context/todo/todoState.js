import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  // add initial state = []
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    const response = await fetch(
      "htttops://rn-todo-ap-37a87-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      }
    );
    const data = await response.json();
    console.log("Data", data);
    dispatch({ type: ADD_TODO, title, id: data.name });
  };
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
  };

  const fetchTodos = async () => {
    showLoader();
    const response = await fetch(
      "https://rn-todo-ap-37a87-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("Data", data);
    // add id = key Object.keys(data).map(key => ({...data[key], id: key }))
    const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
    dispatch({ type: FETCH_TODOS, todos });
    hideLoader();
  };

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
