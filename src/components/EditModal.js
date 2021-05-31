import React from "react";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, onCansel }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      autoCapitalize="none"
      autoCorrect={false}
      maxLength={64}
    >
      <View style={styles.wrap}>
        <TextInput style={styles.input} placeholder="Enter the title " />
        <View style={styles.buttons}>
          <Button
            title="Cansel"
            onPress={onCansel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Save" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
