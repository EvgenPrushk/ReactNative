import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("2");
  const [todos, setTodos] = useState([
    { id: "1", title: " Выучить реакт native" },
    { id: "2", title: " Написать приложение" },
  ]);

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
    const todo = todos.find((t) => t.id === id);
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
            setTodoId(null);
            // prev is array. array have method filter(). If  todo.id === id. I delete element
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    // add function go to MainScreen
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
      />
    );
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
  }
});
