import React from "react";
import { View, StyleSheet } from "react-native";
export const AppCard = props => (
  // add styles in AppCard +styles in props!!!
  // <View style={{...styles.default, ...props.style}}>{props.children}</View>
  <View style={ styles.default }>{props.children}</View>
);

const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadow in ReactNative
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    //for use elevation = shadow
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10
  }
});
