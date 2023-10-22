import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
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
              setTimeout(() => {
                toggleModal();
              }, 200);

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
          </View>
          <View style={styles.flexView}>
            <View style={styles.innerBox1}>
              <Image
                source={{
                  uri:
                    'https://w0.peakpx.com/wallpaper/767/409/HD-wallpaper-ha-long-bay-sea-beautiful-nature-paradise-vietnam-asia-v%E1%BB%8Bnh-h%E1%BA%A1-long-r-summer-travel.jpg',
                }}
                style={styles.backgroundImage}
              />
            </View>
            <View style={styles.innerBox2}>
              <Text style={styles.namepicture}>
                Vịnh Hạ Long
              </Text>
              <Text style={styles.describe}>
                Vịnh Hạ Long được UNESCO hai lần công nhận là Di sản Thiên nhiên Thế giới vào năm 1994 và năm 2000.
              </Text>
            </View>
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
    flexDirection: 'row', 
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fefee3",
    paddingTop: 10,
    paddingHorizontal: 12,
    minHeight: 300,
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
  
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  innerBox1: {
    flex: 2, 
  },
  innerBox2: {
    flex: 1, 
  },

  backgroundImage: {
    top: 20,
    left: 12,
    width: 229,
    height: 220,
  },

  namepicture: {
    marginTop: 15,
    //fontFamily: Poppins,
    color: 'black',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.32,
  },

  describe: {
    width: 110,
    marginTop: 15,
    fontSize: 14,
    //fontFamily: Poppins,
  },
});
