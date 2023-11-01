import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function SecurtityScreen({ route, navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { username } = route.params;

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  const onChangeBackToUser = () => {
    navigation.navigate("User");
  };

  const onSubmit = () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("confirmpass: ", confirmPassword);

    if (password !== confirmPassword) {
      showAlert("Mật khẩu không trùng khớp", false, "Securtity");
      return;
    }

    service
      .put("/user", {
        password: password,
      })
      .then(
        (res) => {
          showAlert("Đổi mật khẩu thành công", false, "Securtity");
          console.log("Change ok", password);
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
      <Button
        title="Back"
        style={{
          width: 100,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center",
          justifyContent: "center",
        }}
        onPress={() => onChangeBackToUser()}
      />
      <Text style={{ marginVertical: 50, textAlign: "center", fontSize: 30 }}>
        Đổi mật khẩu
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
        placeholder="Mật khẩu mới"
        value={password}
        onChangeText={(text) => onChangePassword(text)}
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
        placeholder="Nhập lại mật khẩu mới"
        value={confirmPassword}
        onChangeText={(text) => onChangeConfirmPassword(text)}
      />
      <Button title="Xác nhận" onPress={() => onSubmit()} />
    </View>
  );
}
