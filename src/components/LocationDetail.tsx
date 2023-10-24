import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Loading from "./Loading";

export default function LocationDetail({ route, navigation }) {
  const { location } = route.params;
  var images = [];
  for (let i = 0; i < location.images.length; i++) {
    images.push({
      img: location.images[i],
    });
  }

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });
  const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());

  const [loading, setLoading] = useState(false);
  const [autoPlayCarousel, setAutoPlayCarousel] = useState(true);

  async function loadAudio(url: string) {
    try {
      setLoading(true);
      await playbackObject.loadAsync(
        {
          uri: url,
        },
        {
          shouldPlay: false,
        }
      );
      setLoading(false);
    } catch (error) {
      // Handle the error
      console.error("Error loading audio:", error);
    }
  }

  async function pauseAudio() {
    try {
      await playbackObject.pauseAsync();
    } catch (error) {
      // Handle the error
      console.error("Error pausing audio:", error);
    }
  }

  async function resumeAudio() {
    try {
      await playbackObject.playAsync();
    } catch (error) {
      // Handle the error
      console.error("Error resuming audio:", error);
    }
  }

  useEffect(() => {
    loadAudio(location.audio);
  }, []);

  const [paused, setPaused] = useState(true);

  const handlePause = () => {
    setPaused(!paused);
    if (!paused) {
      pauseAudio().catch((error) => {
        console.error("Error pausing audio:", error);
      });
      console.log("paused");
    } else {
      resumeAudio().catch((error) => {
        console.error("Error resuming audio:", error);
      });
      console.log("resumed");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <View>
        <ImageSlider
          data={images}
          autoPlay={autoPlayCarousel}
          timer={5000}
          caroselImageContainerStyle={styles.caroselImageContainerStyle}
          activeIndicatorStyle={styles.activeIndicatorStyle}
          indicatorContainerStyle={styles.indicatorContainerStyle}
          preview={false}
        />
        <Image
          source={
            paused
              ? require("../../assets/pause.png")
              : require("../../assets/speaking.gif")
          }
          style={styles.chibi}
        />
      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{location.name}</Text>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => navigation.goBack()}
          >
            <Octicons name="report" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg"
        onPress={() => {
          handlePause();
        }}
      >
        <Text>Play/Pause</Text>
      </TouchableOpacity>
    </View>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  activeIndicatorStyle: {
    width: 12,
    height: 12,
    borderRadius: 12,
  },
  caroselImageContainerStyle: {
    backgroundColor: "#000",
    height: screenHeight * 0.5,
    justifyContent: "center",
  },
  indicatorContainerStyle: {
    position: "absolute",
    bottom: -10,
  },
  chibi: {
    position: "absolute",
    bottom: 0,
    left: 5,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  reportButton: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
