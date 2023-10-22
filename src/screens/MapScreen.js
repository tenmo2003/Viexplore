import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import { vietnam, mapStyle } from "../helper/vietnam";
import { initialCamera } from "../helper/camera";
import Loading from "../components/Loading";
import service from "../helper/axiosService";
import Modal from "react-native-modal";
import locationsJson from "../../assets/tempDb/locations.json";

function MapScreen({ navigation }) {
  const mapViewRef = useRef(null);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [camera, setCamera] = useState(initialCamera);
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
    mapViewRef.current.animateCamera(camera, 1000);
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
              // setTimeout(() => {
              //   toggleModal();
              // }, 200);

              navigation.navigate("Post", { id: location.id });
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
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            <Text style={styles.text}>Welcome To My Bottom Sheet</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#161616",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});
