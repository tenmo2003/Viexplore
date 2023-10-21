import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center bg-green-100">
      <Text>Login</Text>
      <TouchableOpacity
        className="bg-red-500 p-3"
        onPress={() => navigation.navigate("User", { msg: "Hello" })}
      >
        <Text className="text-white">User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
