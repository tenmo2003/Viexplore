import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Text } from "react-native-elements";
import service, { removeHeaderConfig } from "../helper/axiosService";
import * as SecureStore from "expo-secure-store";
import TokenContext from "../contexts/TokenContext";
import { MaterialIcons, Fontisto } from "react-native-vector-icons";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export default function AdminScreen({ navigation }) {
  const { token, setToken } = useContext(TokenContext);

  const logOutHandler = () => {
    const removeToken = async () => {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      removeHeaderConfig("Authorization");
      navigation.navigate("Login");
    };
    removeToken();
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.TextAdmin}>Viexplore {"\u00B7"} Admin</Text>
        <TouchableOpacity onPress={logOutHandler}>
        <MaterialIcons
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? 25 : 0,
            right: 10,
          }}
          name="logout"
          size={28}
          color="black"
        />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.nameSection}>Trung tâm kiểm soát</Text>
        </View>
        <View style={styles.category}>
          <View flexDirection="column" justifyContent="center">
            <View style={styles.iconArea1}>
              <Fontisto name="bell" size={36} color="#376CBA" />
            </View>
          </View>
          <Text style={{ left: 30, top: 20, fontSize: 20, color: "#3F3F3F" }}>
            Trung tâm thông báo
          </Text>
          <Feather
            name="chevron-right"
            size={36}
            color="#3F3F3F"
            style={{ position: "absolute", right: 15, top: 32 }}
          />
        </View>
        <View style={styles.category2}>
          <View flexDirection="column" justifyContent="center">
            <View style={styles.iconArea2}>
              <Feather name="message-circle" size={36} color="#10C037" />
            </View>
          </View>
          <Text style={{ left: 30, top: 20, fontSize: 20, color: "#3F3F3F" }}>
            Trung tâm tin nhắn
          </Text>
          <Feather
            name="chevron-right"
            size={36}
            color="#3F3F3F"
            style={{ position: "absolute", right: 15, top: 32 }}
          />
        </View>
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
          {/* <View style={styles.row}>
            <View style={styles.cell}>
              <Feather name="user-x" size={40} color="#292D32" />
              <Text style={styles.text} top={5}>
                Xóa người dùng
              </Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: Platform.OS === "ios" ? height / 7 : height / 7 - 20,
    backgroundColor: "#AACCFF",
    selfItems: "flex-start",
  },
  body: {
    width: "100%",
    height: "100%",
  },
  TextAdmin: {
    top: Platform.OS === "ios" ? 55 : 30,
    left: 20,
    fontSize: 30,
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
};
