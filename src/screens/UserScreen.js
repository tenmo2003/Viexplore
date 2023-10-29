import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import service from "../helper/axiosService";
import Loading from "../components/Loading";

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

  return (
    <View style={styles.container}>
      {loading && <Loading full={true} />}
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons
              name="settings-outline"
              size={23}
              color="#52575D"
              style={{ marginTop: 20, right: 10, position: "absolute" }}
            ></Ionicons>
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
      </ScrollView>
      <BottomTab />
    </View>
  );
};

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
});
export default UserScreen;
