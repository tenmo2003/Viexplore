import { Octicons } from "@expo/vector-icons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";
import Modal from "react-native-modal";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/Ionicons";

export default function LocationDetail({ route, navigation }) {
  const { location } = route.params;
  var images = [];
  for (let i = 0; i < location.images.length; i++) {
    images.push({
      img: location.images[i],
    });
  }

  if (Platform.OS === "ios") {
    const enableAudio = async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
      });
    };
    enableAudio();
  } else {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }
  const [playbackObject, setPlaybackObject] = useState(new Audio.Sound());

  const [loading, setLoading] = useState(false);
  const [autoPlayCarousel, setAutoPlayCarousel] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const [isBookmarked, setBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setBookmarked(!isBookmarked);
  };

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

  useEffect(() => {
    async function unload() {
      await playbackObject.unloadAsync();
    }

    return playbackObject ? () => unload() : undefined;
  }, [playbackObject]);

  const [paused, setPaused] = useState(true);

  const handlePause = () => {
    setPaused(!paused);
    if (!paused) {
      pauseAudio().catch((error) => {
        console.error("Error pausing audio:", error);
      });
    } else {
      resumeAudio().catch((error) => {
        console.error("Error resuming audio:", error);
      });
    }
  };

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

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
        <TouchableOpacity
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? ((screenHeight / 20)) : (screenHeight / 30) - 10,
            right: (screenWidth / 20) - 10,
            backgroundColor: "transparent",
            padding: 10,
          }}
          onPress={handleBookmarkPress}
        >
          <Icon
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={30}
            color={isBookmarked ? "#FFF500" : "white"}
          />
        </TouchableOpacity>
        <Image
          source={
            paused
              ? require("../../assets/pause.png")
              : require("../../assets/speaking.gif")
          }
          style={styles.chibi}
          fadeDuration={1}
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
        avoidKeyboard={true}
      >
        <View style={styles.bottomSheetScreen}>
          <View style={styles.center}>
            <DismissKeyboard>
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
                    <TextInput
                      multiline={true}
                      maxLength={400}
                      style={styles.textReport}
                      placeholder="Viết báo cáo ở đây...(tối đa 400 chữ)"
                    ></TextInput>
                  </View>
                  <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </DismissKeyboard>
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
    width: reportWidth * 0.82,
    borderColor: "#000",
    borderRadius: 20,
  },
  flexStyle: {
    flex: 1,
  },
  containerView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  textReport: {
    marginVertical: Platform.OS === "ios" ? 10 : -5,
    padding: 15,
    borderColor: "#000",
    maxHeight: reportHeight * 0.6,
    width: reportWidth * 0.82,
    lineHeight: -0.5,
    fontSize: screenWidth / 25,
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
