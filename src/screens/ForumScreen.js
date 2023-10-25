import React, { useState } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

function ReportScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSavePress = () => {
    // .. to deal with handleSave case
  };

  return (
    <View style={styles.layoutReport}>
      <StatusBar />
      <View style={styles.buttonReportDemo}>
        <Button title="Report" onPress={toggleModal} />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 45, 
          right: 25, 
          backgroundColor: 'transparent',
          padding: 10,
        }}
        onPress={handleSavePress}
      >
        <Icon name="save" size={30} color="blue" />
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
                  <TextInput style={styles.textReport}>
                    <Text>Viết báo cáo ở đây...</Text>
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

export default ReportScreen;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const reportHeight = screenHeight * 0.5;
const reportWidth = screenWidth;

const styles = StyleSheet.create({
  buttonReportDemo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  layoutReport: {
    flex: 1,
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
