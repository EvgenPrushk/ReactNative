import React, { useState } from "react";
import { View, StyleSheet, TextInput, Modal } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
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

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter the title "
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
            Cansel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
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
