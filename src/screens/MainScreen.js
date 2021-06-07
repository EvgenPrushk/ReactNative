import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";

import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

export const MainScreen = ({
  addTodo,
  todos,
  removeTodo,
  fetchTodos,
  loading,
  error,
}) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    loadTodos();
  }, []);

  // use useEffect, besause only 1  init component
  useEffect(() => {
    // calculate width
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      // change state
      setDeviceWidth(width);
    };
    // addEventListener "change"
    Dimensions.addEventListener("change", update);
    // clear addEventListener  and delete event "change"
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={(style = styles.center)}>
        <AppText style={(style = styles.error)}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/no-items.png")}
        />
      </View>
    );
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
