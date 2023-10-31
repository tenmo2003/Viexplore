import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function EditProfileScreen({ route, navigation }) {
  const [newFullname, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const { userInfo } = route.params;

  const onChangeFullName = (text) => {
    setNewFullName(text);
  };

  const onChangeEmail = (text) => {
    setNewEmail(text);
  };

  const onChangeBackToUser = () => {
    navigation.navigate("User");
  };

  const onSubmit = () => {
    console.log("fullName: ", newFullname);
    console.log("email: ", userInfo.email);
    console.log("username: ", userInfo.username);

    service
      .post("/user", {
        fullName: newFullname,
        email: newEmail,
      })
      .then(
        (res) => {
          showAlert("Edited successfully", false, "EditProfile");
          console.log("Edit ok", newFullname /*newEmail*/);
          service.get("/users/me", {}).then((res) => {
            if (res.data.status === 200) {
              navigation.navigate("User");
            }
          });
        },
        () => {
          console.log("Network failed");
        }
      );
  };

  return (
    <View>
      <Button title="Back" style={{
          width: 100,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center",
          justifyContent: "center",
        }} onPress={() => onChangeBackToUser()} />
      <Text style={{ marginVertical: 50, textAlign: "center", fontSize: 30 }} >
        EditProfileScreen
      </Text>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          left: 10,
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="New full name"
        value={newFullname}
        onChangeText={(text) => onChangeFullName(text)}
      />
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          left: 10,
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="Change email"
        value={newEmail}
        onChangeText={(text) => onChangeEmail(text)}
      />
      {/* <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="Choose avatar here"
        value={fullname}
        onChangeText={(text) => onChangeAvatar(text)}
      /> */}
      <Button title="Xác nhận" onPress={() => onSubmit()} />
    </View>
  );
}
