import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Loading from "../components/Loading";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";

const Stack = createStackNavigator();

export default function UserTabs() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await SecureStore.getItemAsync("token");
      setLoggedIn(token !== null);
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  return (
    <View className="flex-1">
      {loading ? (
        <Loading />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {loggedIn ? (
            <Stack.Screen name="User" component={UserScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      )}
    </View>
  );
}
