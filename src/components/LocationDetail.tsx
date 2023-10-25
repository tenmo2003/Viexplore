import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Loading from "./Loading";
import Modal from "react-native-modal";

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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            onPress={() => setModalVisible(true)}
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
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.popupPosi}
      >
        <View style={styles.bottomSheetScreen}>
          <View style={styles.center}>
            <View style={styles.flexColumn}>
              <View style={styles.center}>
                <View style={styles.iconReport}>
                  <Image
                    source={require("../../assets/iconReport.png")}
                    style={styles.img}
                  />
                </View>
                <Text style={styles.headerReport}>ND BÁO CÁO</Text>
                <View style={styles.reportContent}>
                  <TextInput style={styles.textReport} placeholder="Viết báo cáo ở đây...">
                    
                  </TextInput>
                </View>
                <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const reportHeight = screenHeight * 0.5;
const reportWidth = screenWidth;

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
  popupPosi: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bottomSheetScreen: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    borderWidth: 5,
    borderColor: "#000",
    minHeight: reportHeight,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  iconReport: {
    position: "absolute",
    top: -60,
    width: 80,
    height: 80,
    backgroundColor: "#bbb",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#000",
  },
  img: {
    borderRadius: 20,
    width: 74,
    height: 74,
  },
  headerReport: {
    color: "#000",
    fontSize: 32,
    marginTop: 45,
    fontWeight: "bold",
  },
  reportContent: {
    borderWidth: 3,
    height: reportHeight * 0.65,
    alignItems: "center",
    paddingVertical: reportHeight / 14,
    width: reportWidth * 0.82,
    borderColor: "#000",
    borderRadius: 20,
  },
  textReport: {
    borderColor: "#000",
    borderRadius: 20,
    height: reportHeight * 0.5,
    width: reportWidth * 0.65,
    fontSize: 18,
  },
  containerButton: {
    width: reportHeight * 0.7,
  },
  button: {
    backgroundColor: "#687DAA",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
