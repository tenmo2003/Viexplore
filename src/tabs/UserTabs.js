import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import TokenContext from "../contexts/TokenContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SignUpScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetpassScreen from "../screens/ResetpassScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

export default function UserTabs({ navigation }) {
  const { token, setToken } = useContext(TokenContext);

  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? "User" : "Login"}
      >
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="MailResetPass" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPass" component={ResetpassScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </View>
  );
}
