import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const UserScreen = ({ route, navigation }) => {
  return (
    <View className="flex-1 justify-center items-center bg-cyan-100">
      <Text>User</Text>
      <TouchableOpacity
        className="bg-red-500 p-3"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-white">Map</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;
