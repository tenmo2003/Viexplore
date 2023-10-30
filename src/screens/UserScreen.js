import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Feather, Octicons } from "react-native-vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import service from "../helper/axiosService";
import Loading from "../components/Loading";
import Modal from "react-native-modal";
import * as SecureStore from "expo-secure-store";
import TokenContext from "../contexts/TokenContext";

const BottomTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const Post = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#0000" }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={styles.content}>
                <Image
                  source={require("./../../assets/ho.jpg")}
                  style={styles.img}
                  resizeMode="center"
                ></Image>
                <View style={styles.name}>
                  <Text
                    style={{
                      fontSize: 16,
                      flexWrap: "wrap",
                      textAlign: "center",
                    }}
                  >
                    Hồ Gươm
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  const Forums = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  const Save = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
              <Text style={styles.img}>2</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      style={{ marginTop: -450 }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 1.5,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "bookmarks" : "bookmarks";
            color = focused ? "#52575D" : "#AEB5BC";
          } else if (route.name === "Save") {
            iconName = focused ? "heart" : "heart";
            color = focused ? "#52575D" : "#AEB5BC";
          } else {
            iconName = focused ? "heart" : "heart";
            color = focused ? "#52575D" : "#AEB5BC";
          }
          return <Ionicons name={iconName} color={color} size={23} />;
        },
      })}
    >
      <Tab.Screen name="Post" component={Post}></Tab.Screen>
      <Tab.Screen name="Save" component={Forums}></Tab.Screen>
      <Tab.Screen name="Forums" component={Forums}></Tab.Screen>
    </Tab.Navigator>
  );
};

const UserScreen = ({ route, navigation }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setLoading(true);
    service.get("users/me", {}).then(
      (res) => {
        const userData = res.data.results;
        setFullName(userData.fullName);
        setUsername(userData.username);
        setLoading(false);
      },
      () => {
        console.log("failed");
      }
    );
  }, []);

  const { token, setToken } = useContext(TokenContext);

  const logOutHandler = () => {
    const loadToken = async () => {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      navigation.navigate("Login");
      console.log("remove token");
    };
    loadToken();
  };

  return (
    <View style={styles.container}>
      {loading && <Loading full={true} />}
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
          <TouchableOpacity onPress={toggleModal}>
            <Octicons
              name="three-bars"
              size={24}
              style={{
                position: "absolute",
                top:
                  Platform.OS === "ios"
                    ? screenHeight / 20
                    : screenHeight / 30 - 10,
                right: screenWidth / 20 - 10,
                backgroundColor: "transparent",
                padding: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("./../../assets/cho.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={[styles.text, { fontSize: 20, fontWeight: "bold" }]}>
            {fullname}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: "#AEB5BC",
                fontSize: 14,
                fontStyle: "italic",
                marginBottom: 5,
              },
            ]}
          >
            {username}
          </Text>
        </View>
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
              <View style={styles.flexColumn}>
                <View style={styles.editProfile}>
                  <TouchableOpacity style={styles.flexEditProfile}>
                    <Ionicons name="settings-outline" size={30} />
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        paddingHorizontal: 10,
                      }}
                    >
                      Edit profile
                    </Text>
                    <Feather
                      name="chevron-right"
                      style={{
                        paddingHorizontal:
                          Platform.OS === "ios"
                            ? screenWidth / 3
                            : screenWidth / 2.8,
                      }}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logOut} onPress={logOutHandler}>
                  <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                    Đăng xuất
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <BottomTab />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const settingsHeight = screenHeight / 5;
const settingsWidth = screenWidth / 12;
const paddingTopModalContent = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  text: {
    // fontFamily: 'Cochin',
    color: "#52575D",
    top: 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 100,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  profileImage: {
    marginTop: 50,
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  info: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "column",
    flexWrap: "wrap",
    margin: 5,
    borderRadius: 12,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    width: Dimensions.get("window").width / 3 - 13,
    height: Dimensions.get("window").height / 6 - 2,
    backgroundColor: "#0000",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  name: {
    width: Dimensions.get("window").width / 3 - 13,
    backgroundColor: "#ffff",
    marginTop: -4,
    alignSelf: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 0.3,
    justifyContent: "center",
  },
  profileImage: {
    marginTop: 50,
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    left: 70,
    top: 130,
    width: 20,
    height: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: paddingTopModalContent,
    paddingHorizontal: settingsWidth,
    borderWidth: 5,
    borderColor: "#000",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    minHeight: settingsHeight,
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
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: settingsHeight - paddingTopModalContent * 2,
  },
  flexEditProfile: {
    display: "flex",
    flexDirection: "row",
  },
  editProfile: {
    top: 20,
    width: "auto",
    height: "auto",
  },
  logOut: {
    top: settingsHeight - 80,
    alignItems: "center",
  },
});
export default UserScreen;
