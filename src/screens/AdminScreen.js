import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput
} from "react-native";
import { Text } from "react-native-elements";
import service, { removeHeaderConfig } from "../helper/axiosService";
import * as SecureStore from "expo-secure-store";
import TokenContext from "../contexts/TokenContext";
import { MaterialIcons, Fontisto } from "react-native-vector-icons";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Loading from "../components/Loading";
import { showAlert } from "../helper/CustomAlert";

export default function AdminScreen({ navigation }) {
  const { token, setToken } = useContext(TokenContext);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const backout = () => {
    navigation.navigate("User");
  };

  const toGotoManagedReport = () => {
    navigation.navigate("ManagedReport");
  };

  const toGotoUserList = () => {
    navigation.navigate("UserList");
  };

  const toGotoTopicList = () => {
    navigation.navigate("TopicList");
  }

  const toGotoLocaList = () => {
    navigation.navigate("LocaList");
  };

  const onChangeTitle = (text) => {
    setTitle(text);
  };

  const onChangeMessage = (text) => {
    setMessage(text);
  };

  // const DismissKeyboard = ({ children }) => (
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //     {children}
  //   </TouchableWithoutFeedback>
  // );

  const onSubmit = () => {
    console.log("Title: ", title);
    console.log("Message: ", message);

    if (title == "" || message == "") {
      showAlert("Vui lòng điền thông tin", false, "Admin");
      return;
    }

    setLoading(true);
    service
      .post("/admin/broadcast", {
        title: title,
        message: message,
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.message);
          setLoading(false);
          toggleModal();
        } else {
          console.log(res.data.message);
          setLoading(false);
          toggleModal();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toggleModal();
      });
    setTitle("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text style={styles.TextAdmin}>Viexplore {"\u00B7"} Admin</Text>
          <TouchableOpacity onPress={backout}>
            <MaterialIcons name="logout" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.nameSection}>Trung tâm kiểm soát</Text>
        </View>
        <TouchableOpacity style={styles.category} onPress={toggleModal}>
          <View flexDirection="column" justifyContent="center">
            <View style={styles.iconArea1}>
              <Fontisto name="bell" size={36} color="#376CBA" />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", left: 30 }}>
            <Text style={{ fontSize: 20, color: "#3F3F3F" }}>
              Tạo thông báo tổng
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={36}
            color="#3F3F3F"
            style={{ position: "absolute", right: 15, top: (100-36)/2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category2}
          onPress={toGotoManagedReport}
        >
          <View flexDirection="column" justifyContent="center">
            <View style={styles.iconArea2}>
              <Feather name="message-circle" size={36} color="#10C037" />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", left: 30 }}>
            <Text style={{ fontSize: 20, color: "#3F3F3F" }}>
              Trung tâm báo cáo
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={36}
            color="#3F3F3F"
            style={{ position: "absolute", right: 15, top: (100-36)/2 }}
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.nameSection}>Trung tâm kiểm soát</Text>
        </View>
        <View style={styles.col}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.cell} onPress={toGotoUserList}>
              <AntDesign name="user" size={40} color="#292D32" />
              <Text style={styles.text} top={5}>
                Người dùng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cell} onPress={toGotoTopicList}>
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#292D32"
              />
              <Text style={styles.text} top={5}>
                Bài đăng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cell} onPress={toGotoLocaList}>
              <Ionicons name="location-outline" size={40} color="#292D32" />
              <Text style={styles.text} top={5}>
                Di tích
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={600}
        animationOutTiming={300}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={300}
        style={styles.modal}
        avoidKeyboard={true}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            {/* <DismissKeyboard> */}
            <View style={styles.flexColumn}>
              <View style={styles.center}>
                <View style={styles.headerReport}>
                  <TextInput
                    multiline={true}
                    maxLength={50}
                    style={styles.headerText}
                    placeholder="Tiêu đề...(tối đa 50 chữ)"
                    onChangeText={(value) => onChangeTitle(value)}
                  ></TextInput>
                </View>
                <View style={styles.reportContent}>
                  <TextInput
                    multiline={true}
                    maxLength={400}
                    style={styles.textReport}
                    placeholder="Viết thông báo ở đây...(tối đa 400 chữ)"
                    onChangeText={(value) => onChangeMessage(value)}
                  ></TextInput>
                </View>
                <View style={styles.containerButton}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSubmit()}
                  >
                    <Text style={styles.buttonText}>Gửi đi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* </DismissKeyboard> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const reportHeight = height * 0.5;
const reportWidth = width;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: Platform.OS === "ios" ? height / 8 : height / 8 - 20,
    backgroundColor: "#AACCFF",
    selfItems: "flex-start",
  },
  body: {
    width: "100%",
    height: "100%",
  },
  TextAdmin: {
    // top: Platform.OS === "ios" ? 55 : 20,
    // left: 20,
    fontSize: 26,
    color: "#000",
  },
  section: {
    height: 45,
    backgroundColor: "#EBEBEB",
  },
  nameSection: {
    left: 20,
    top: 10,
    fontSize: 20,
    color: "#3F3F3F",
  },
  category: {
    height: 100,
    fontSize: 15,
    color: "#3F3F3F",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  category2: {
    height: 100,
    fontSize: 15,
    color: "#3F3F3F",
    flexDirection: "row",
  },
  iconArea1: {
    left: 20,
    height: 65,
    width: 65,
    backgroundColor: "#AACCFF",
    opacity: 0.81,
    alignItems: "center",
    justifyContent: "center",
  },
  iconArea2: {
    left: 20,
    height: 65,
    width: 65,
    backgroundColor: "#B1FFAA",
    opacity: 0.81,
    alignItems: "center",
    justifyContent: "center",
  },
  col: {
    flexDirection: "column",
  },
  row: {
    top: 10,
    flexDirection: "row",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  cell: {
    width: width / 3 - width / 18,
    height: width / 3 - width / 18,
    margin: width / 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#959595",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#ffffff",
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
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  headerReport: {
    width: reportWidth * 0.8,
    height: reportHeight * 0.2,
    marginTop: 20,
  },
  headerText: {
    color: "#000",
    fontSize: 26,
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
    fontSize: width / 25,
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
};
