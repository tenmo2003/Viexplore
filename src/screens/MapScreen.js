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
          fillColor="rgba(255, 255, 255, 0.5)"
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
              }, 500);

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
          animationInTiming={900}
          animationOutTiming={600}
          backdropOpacity={0.3}
          backdropTransitionInTiming={900}
          backdropTransitionOutTiming={600}
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
                <Text style={styles.namepicture}>{selectedLocation.name}</Text>
                <View style={styles.barIcon2}/>
                <View style={styles.flexView}>
                  <Feather name="map-pin" size={40} style={styles.icon} />
                  <Text style={styles.describe}>
                    {selectedLocation.shortDescription}
                  </Text>
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

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    flexDirection: "row",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingHorizontal: 12,
    minHeight: 260,
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
    width: 145,
    height: 2,
    marginTop: 25,
    marginLeft: 30,
    backgroundColor: "#000",
    borderRadius: 3,
  },

  icon: {
    marginTop: 20,
    marginLeft: 30,
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
  },

  backgroundImage: {
    top: 20,
    left: 12,
    width: 195,
    height: 195,
    borderRadius: 15,
  },

  namepicture: {
    marginTop: 55,
    marginLeft: 35,
    //fontFamily: Poppins,
    color: "black",
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: -0.32,
    fontStyle: "normal",
    
  },

  describe: {
    width: 110,
    marginTop: 15,
    marginLeft: 10,
    fontSize: 14,
    //fontFamily: Poppins,
  },
});
