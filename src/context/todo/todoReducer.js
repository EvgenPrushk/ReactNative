import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        // ...state -deploy state
        ...state,
        todos: [
          //todos : [...] - copy now state and add new Object (id + title PARAMS)
          ...state.todos,
          {
             // key is String in React
            id: Date.now().toString(),
            title: action.title,
          },
        ],
      };
    case UPDATE_TODO:
      return {
        // ...state -deploy state
        ...state,
        // filter todo.id !== action.id
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            todo.title = action.title;
          }
          return todo;
        }),
      };

    default:
      return state;
  }
};
