import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const setUsernameText = (text) => {
    setUsername(text);
  }

  const onSubmit = () => {
    service
      .get("/mail-otp?username=" + username)
      .then(
        (res) => {
          console.log(res.data);
          console.log(res.data.status);
          if (res.data.status === 200) {
            console.log(res.data.results);
            // showAlert("Mã OTP sẽ hết hạn sau 1 phút", true, "MailResetPass");
            navigation.navigate("Otp", { username: username });
          } else {
            showAlert("Tên người dùng sai hoặc không tồn tại", false, "MailResetPass");
            return;
          }
        },
        () => {
          console.log("Network failed");
        }
      );
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

          <TouchableOpacity style={styles.inputContainer}>
            <Input
              placeholder="username"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#BABABA",
                size: 20,
              }}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={username}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(text) => setUsernameText(text)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Send"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={styles.signupButton}
              onPress={onSubmit}
            />
          </TouchableOpacity>

          <Text
            style={{
              marginBottom: 25,
              fontWeight: "bold",
              fontSize: 14,
              marginTop: 15,
            }}
          >
            {" "}
            ______________________ OR ______________________{" "}
          </Text>

          <TouchableOpacity style={styles.btn}>
            <Button
              title="Login"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
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
    alignItems: "center",
    backgroundColor: "#AACCFF", // Mã màu nền
    height: Dimensions.get("window").height - ScreenHeight * 0.09,
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

  loginButton: {
    backgroundColor: "#687DAA",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    padding: 0,
  },

  signupButton: {
    backgroundColor: "#FF6B06",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    padding: 0,
  },
};
