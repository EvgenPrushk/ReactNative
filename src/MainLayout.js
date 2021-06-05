import React, {  useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";

import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/TodoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext)

  //   const removeTodo = (id) => {
  //     const todo = todos.find((t) => t.id === id);
  //     Alert.alert(
  //       "Deleting an item",
  //       `Are you sure want to delete ${todo.title}`,
  //       [
  //         {
  //           text: "Cancellation",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Delete",
  //           style: "destructive",
  //           //change of state
  //           onPress: () => {
  //             setTodoId(null);
  //             // prev is array. array have method filter(). If  todo.id === id. I delete element
  //             setTodos((prev) => prev.filter((todo) => todo.id !== id));
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   };



  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      updateTodo={updateTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    // add function go to MainScreen
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => changeScreen(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App!" />

      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
  },
});
