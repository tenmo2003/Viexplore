import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function ResetpassScreen({ route, navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { username } = route.params;

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  const onSubmit = () => {
    if (password !== confirmPassword) {
      showAlert("Mật khẩu không trùng khớp", false, "ResetPass");
      return;
    }

    service
      .put("/reset-password", {
        username: username,
        newPassword: password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          showAlert("Lấy lại mật khẩu thành công", false, "ResetPass");
          navigation.navigate("Login");
        } else {
          showAlert("Mất kết nối", false, "ResetPass");
          return;
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/reset_password.png")}
            style={styles.img}
          />

          <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>
            Reset Password
          </Text>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Password"
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: "#BABABA",
              }}
              secureTextEntry={true}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={password}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(text) => onChangePassword(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Confirm password"
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: "#BABABA",
              }}
              secureTextEntry={true}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={confirmPassword}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(text) => onChangeConfirmPassword(text)}
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Reset password"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={styles.signupButton}
              onPress={onSubmit}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { height, width } = Dimensions.get("window");
const standarWidth = 360;
const standardHeight = 800;
const imgWidth = (500 / standarWidth) * width;
const imgHeight = (550 / standardHeight) * width;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AACCFF", // Mã màu nền
    height: height - ScreenHeight * 0.09,
  },

  img: {
    width: imgWidth,
    height: imgHeight,
    aspectRatio: 2.9 / 2,
    marginTop: Platform.OS === "ios" ? (Dimensions.get("window").width < 768 ? 20 : 60) + 50 : 0,
  },

  inputContainer: {
    width: "80%",
  },

  inputContainerStyle: {
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "white",
    height: 50,
    elevation: 5,
    shadowColor: "black",
  },

  inputStyle: {
    paddingLeft: 10,
  },

  leftIconStyle: {
    paddingLeft: 15,
  },

  btn: {
    width: "75%",
    height: 50,
  },

  signupButton: {
    backgroundColor: "#FF6B06",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    padding: 0,
  },
};
