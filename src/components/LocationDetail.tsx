import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { StatusBar } from "expo-status-bar";

export default function LocationDetail({ route, navigation }) {
  const [autoPlay, setAutoPlay] = useState(true);

  const { location } = route.params;
  var images = [];
  for (let i = 0; i < location.images.length; i++) {
    images.push({
      img: location.images[i],
    });
  }

  return (
    <View>
      <ImageSlider
        data={images}
        autoPlay={autoPlay}
        timer={5000}
        caroselImageContainerStyle={styles.caroselImageContainerStyle}
        activeIndicatorStyle={styles.activeIndicatorStyle}
        indicatorContainerStyle={styles.indicatorContainerStyle}
      />
      <Text>{location.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  activeIndicatorStyle: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  caroselImageContainerStyle: {
    backgroundColor: "#000",
  },
  indicatorContainerStyle: {
    position: "absolute",
    bottom: -10,
  }
});
