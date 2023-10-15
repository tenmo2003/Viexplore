import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import ForumScreen from "./screens/ForumScreen";
import MapScreen from "./screens/MapScreen";
import UserTabs from "./tabs/UserTabs";

const _renderIcon = (routeName, selectedTab) => {
  switch (routeName) {
    case "forum":
      return (
        <MaterialCommunityIcons name="forum-outline" size={24} color="black" />
      );
    case "user":
      return <AntDesign name="user" size={25} color="black" />;
  }

  return (
    <Ionicons
      name={"close-outline"}
      size={25}
      color={routeName === selectedTab ? "black" : "gray"}
    />
  );
};
const renderTabBar = ({ routeName, selectedTab, navigate }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}
    >
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        screenOptions={{ headerShown: false }}
        type="DOWN"
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="map"
        borderTopLeftRight
        // eslint-disable-next-line no-unused-vars
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("map")}
              map
            >
              <Feather name={"map-pin"} color="black" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="forum"
          position="LEFT"
          component={() => <ForumScreen />}
        />
        <CurvedBottomBarExpo.Screen
          name="user"
          component={() => <UserTabs />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="map"
          component={() => <MapScreen />}
          position="CIRCLE"
        />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
});
