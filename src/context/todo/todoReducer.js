import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../types";

const handlers = {
  [ADD_TODO]: (state, { title }) => ({
    // ...state -deploy state
    ...state,
    todos: [
      //todos : [...] - copy now state and add new Object (id + title PARAMS)
      ...state.todos,
      {
        // key is String in React
        id: Date.now().toString(),
        title,
      },
    ],
  }),

  [REMOVE_TODO]: (state, id) => ({
    // ...state -deploy state
    ...state,
    // filter todo.id !== action.id
    todos: state.todos.filter((todo) => todo.id !== action.id),
  }),

  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }),
  }),

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
