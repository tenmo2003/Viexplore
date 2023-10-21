import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import Post from "../components/Post";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

export default function MapTabs({ navigation }) {
  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Map"
      >
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </View>
  );
}
