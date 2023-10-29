import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import service, { getAllHeaderConfig, updateHeaderConfig } from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function SetFullNameScreen({ route, navigation }) {
  const [fullname, setFullName] = useState("");

  const { username } = route.params;
  const { password } = route.params;


  const onChangeFullName = (text) => {
    setFullName(text);
  };

  const onSubmit = () => {
    console.log("fullName: ", fullname);
    console.log("username: ", username);
    console.log("password: ", password);

    service
      .post("/user", {
        fullName: fullname,
        username: username,
        password: "admin",
      })
      .then(
        (res) => {
          showAlert("Create full name successfully", false, "SetFullName");
          console.log("OK", fullname);
          service
          .get("/users/me", {})
          .then((res) => {
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
      <Text style={{ marginVertical: 50, textAlign: "center", fontSize: 30 }}>
        SetFullNameScreen
      </Text>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="Your full name"
        value={fullname}
        onChangeText={(text) => onChangeFullName(text)}
      />
      <Button title="Chuyển trang" onPress={() => onSubmit()} />
    </View>
  );
}
