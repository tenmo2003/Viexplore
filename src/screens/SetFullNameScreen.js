import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import service, { getAllHeaderConfig, updateHeaderConfig } from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import Loading from "../components/Loading";

export default function SetFullNameScreen({ route, navigation }) {
  const [fullname, setFullName] = useState("");

  const [loading, setLoading] = useState(false);

  const { username } = route.params;


  const onChangeFullName = (text) => {
    setFullName(text);
  };

  const onSubmit = () => {
    setLoading(true);

    service
      .put("/user", {
        username: username,
        fullName: fullname,
      })
      .then(
        (res) => {
            navigation.navigate("User");
            setLoading(false);
        },
        () => {
          console.log("Network failed");
          setLoading(false);
        }
      );
  };

  return (
    <View>
      {loading && <Loading/>}
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
