import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

export default function Loading({ full=false }) {
  return (
    <View style={[styles.container, {backgroundColor: full ? "rgba(226, 232, 240, 1)" : "rgba(226, 232, 240, 0.5)"}]}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
