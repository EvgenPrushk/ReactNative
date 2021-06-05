import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  FETCH_TODOS,
} from "../types";

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    // ...state -deploy state
    ...state,
    todos: [
      //todos : [...] - copy now state and add new Object (id + title PARAMS)
      ...state.todos,
      {
        // key is String in React
        id,
        title,
      },
    ],
  }),

  [REMOVE_TODO]: (state, { id }) => ({
    // ...state -deploy state
    ...state,
    // filter todo.id !== action.id
    todos: state.todos.filter((todo) => todo.id !== id),
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

  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),

  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
