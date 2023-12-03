import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import TokenContext from "../contexts/TokenContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OtpScreen from "../screens/OtpScreen";
import ResetpassScreen from "../screens/ResetpassScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SetFullNameScreen from "../screens/SetFullNameScreen";
import SecurityScreen from "../screens/SecurityScreen";
import AdminScreen from "../screens/AdminScreen";
import UserListScreen from "../screens/UserListScreen";
import TopicListScreen from "../screens/TopicListScreen";
import LocaListScreen from "../screens/LocaListScreen";
import TopicDetailScreen from "../screens/TopicDetailScreen";
import ManagedReportScreen from "../screens/ManagedReportScreen";

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
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MailResetPass" component={ForgotPasswordScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="ResetPass" component={ResetpassScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="SetFullName" component={SetFullNameScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="TopicList" component={TopicListScreen} />
        <Stack.Screen name="LocaList" component={LocaListScreen} />
        <Stack.Screen name="Topic" component={TopicDetailScreen} />
        <Stack.Screen name="ManagedReport" component={ManagedReportScreen} />
      </Stack.Navigator>
    </View>
  );
}
