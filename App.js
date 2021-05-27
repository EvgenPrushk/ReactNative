import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        // key is String in React
        id: Date.now().toString(),
        title,
      },
    ]);
  };

  const removeTodo = (id) => {
    // prev is array. array have method filter(). If  todo.id === id. I delete element
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  let content = (
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} />
  );

  if (todoId) {
    content = <TodoScreen />;
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      {content}
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
