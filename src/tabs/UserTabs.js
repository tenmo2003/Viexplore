import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import TokenContext from "../contexts/TokenContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotpassMailScreen from "../screens/Forgotpass_email";
import ResetpassScreen from "../screens/ResetpassScreen";

const Stack = createStackNavigator();

export default function UserTabs({ navigation }) {
  const token = useContext(TokenContext);

  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? "User" : "Login"}
      >
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MailResetPass" component={ForgotpassMailScreen} />
        <Stack.Screen name="ResetPass" component={ResetpassScreen} />
      </Stack.Navigator>
    </View>
  );
}
