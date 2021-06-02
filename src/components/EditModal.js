import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, onCansel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Error!",
        `Min size name 3 simbols. Now ${title.trim().length} simbols.`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      maxLength={64}
    >
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter the title "
          autoCapitalize="none"
          autoCorrect={false}          
        />
        <View style={styles.buttons}>
          <Button
            title="Cansel"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Save" onPress={saveHandler} />
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
