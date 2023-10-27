import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import Post from "../components/Post";
import MapScreen from "../screens/MapScreen";
import LocationDetail from "../screens/LocationDetailScreen";

const Stack = createStackNavigator();

export default function MapTabs({ navigation }) {
  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Map"
      >
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="LocationDetail" component={LocationDetail} />
      </Stack.Navigator>
    </View>
  );
}
