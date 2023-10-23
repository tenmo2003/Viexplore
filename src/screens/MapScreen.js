import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import { vietnam, mapStyle } from "../helper/vietnam";
import { initialCamera } from "../helper/camera";
import Loading from "../components/Loading";
import service from "../helper/axiosService";
import Modal from "react-native-modal";
import locationsJson from "../../assets/tempDb/locations.json";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";

function MapScreen({ navigation }) {
  const mapViewRef = useRef(null);

  const [camera, setCamera] = useState(initialCamera);
  const [loading, setLoading] = useState(false);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // service.get("/locations").then(
      //   (response) => {
      //     setLocations(response.data.results);
      //     setLoading(false);
      //   },
      //   () => setLoading(false)
      // );
      setLocations(locationsJson);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const animateToCamera = (camera) => {
    mapViewRef.current.animateCamera(camera, 500);
  };

  return (
    <View className="flex-1 items-center justify-end bg-gray-200">
      <MapView
        ref={mapViewRef}
        className="w-full h-full"
        customMapStyle={mapStyle}
        camera={camera}
        minZoomLevel={5.7}
        maxZoomLevel={8.5}
        pitchEnabled={false}
        rotateEnabled={false}
        moveOnMarkerPress={false}
      >
        <Geojson
          geojson={vietnam}
          strokeColor="gray"
          fillColor="rgba(255, 240, 192, 0.5)"
          strokeWidth={1}
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => {
              setSelectedLocation(location);

              animateToCamera({
                center: {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                zoom: 8,
              });

              setTimeout(() => {
                toggleModal();
              }, 450);

              // navigation.navigate("Post", { id: location.id });
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity
        className="absolute bottom-16 right-3 rounded-full bg-white p-3"
        onPress={() => animateToCamera(initialCamera)}
      >
        <Text>Reset</Text>
      </TouchableOpacity>
      {selectedLocation && (
        <Modal
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          swipeDirection="down"
          onSwipeComplete={toggleModal}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={700}
          animationOutTiming={300}
          backdropOpacity={0.3}
          backdropTransitionInTiming={700}
          backdropTransitionOutTiming={300}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
            </View>
            <View style={styles.flexView}>
              <View style={styles.innerBox1}>
                <Image
                  source={{
                    uri: selectedLocation.thumbnail,
                  }}
                  style={styles.backgroundImage}
                />
              </View>
              <View style={styles.innerBox2}>
                <View style={styles.boxColumn}>
                  <View style={styles.content1}>
                    <View style={styles.containerName}>
                      <Text style={styles.namepicture}>
                        {selectedLocation.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.content2}>
                    <View style={styles.barIcon2} />
                  </View>
                  <View style={styles.content3}>
                    <View style={styles.flexView2}>
                      <Feather name="map-pin" size={20} style={styles.icon} />
                      <Text style={styles.describe}>
                        {selectedLocation.generalLocation}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.content4}>
                    <View style={styles.containerButton}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                          setTimeout(() => {
                            navigation.navigate("LocationDetail", {
                              location: selectedLocation,
                            });
                          }, 0);
                        }}
                        style={styles.button}
                      >
                        <Text style={styles.buttonText}>Xem</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default MapScreen;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const leftMargin = screenWidth / 30;
const objectWidth = screenWidth / 2 - 15;

const modalHeight = 260;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    gap: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  flexView2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
  boxColumn: {
    flex: 1,
    flexDirection: "column",
  },
  content1: { flex: 3 },
  content2: {},
  content3: { flex: 2, marginTop: 10 },
  content4: { flex: 1 },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingHorizontal: 12,
    minHeight: modalHeight,
    paddingBottom: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth: 5,
    borderColor: "#000",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 4,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },

  barIcon2: {
    position: "relative",
    width: 145,
    height: 2,
    backgroundColor: "#000",
    borderRadius: 3,
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  innerBox1: {
    flex: 1,
  },
  innerBox2: {
    flex: 1,
    marginTop: 10,
  },

  backgroundImage: {
    width: objectWidth,
    height: 170,
    borderRadius: 15,
  },

  containerName: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    width: 150,
    maxHeight: 100,
    bottom: 0,
  },

  namepicture: {
    //fontFamily: Poppins,
    color: "black",
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -0.32,
    fontStyle: "normal",
    fontWeight: "bold",
  },

  icon: {
    position: "relative",
    bottom: 10,
  },

  describe: {
    position: "relative",
    bottom: 10,
    width: 120,
    fontSize: 18,
    marginLeft: 5,
    lineHeight: 20,
    letterSpacing: -0.32,
    //fontFamily: Poppins,
  },

  containerButton: {
    flex: 1,
    bottom: 10,
    width: 150,
  },

  button: {
    marginTop: -10,
    backgroundColor: "#687DAA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 6,
  },

  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
