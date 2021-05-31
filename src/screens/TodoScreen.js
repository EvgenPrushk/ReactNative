import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";

export const TodoScreen = ({ goBack, todo, onRemove }) => {
  const [modal, setModal] = useState(false);

  return (
    <View>
      <EditModal visible={modal} onCansel={()=>setModal(false)}/>
      
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Editing" onPress={() => setModal(true)}></Button>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color={THEME.GRAY_COLOR} />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
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
    padding: 15,
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
  }
});
