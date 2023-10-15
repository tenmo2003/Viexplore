import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import TokenContext from "../src/contexts/TokenContext";
import LoginScreen from "../src/screens/LoginScreen";
import UserScreen from "../src/screens/UserScreen";

const Stack = createStackNavigator();

export default function UserTabs() {
  const token = useContext(TokenContext);

  return (
    <View className="flex-1">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token !== null ? (
          <Stack.Screen name="User" component={UserScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </View>
  );
}
