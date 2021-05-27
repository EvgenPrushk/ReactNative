import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Editing"></Button>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color={THEME.GRAY_COLOR} />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => console.log("Delete")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20
  },
});
