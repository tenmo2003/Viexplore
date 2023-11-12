import React, { useState } from "react";
import {
  View,
  Image,
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

export default function OtpScreen({ route, navigation }) {
  const [otpInput, setOtpInput] = useState("");

  const { username } = route.params;

  const onChangeOtp = (text) => {
    setOtpInput(text);
  }

  const onSubmit = () => {
    service
      .post("/verify-otp?username=" + username + "&otp=" + otpInput)
      .then((res) => {
        if (res.data.status === 200) {
            console.log(res.data.message);
            navigation.navigate("ResetPass", { username: username });
        } else {
          showAlert("Mã OTP không đúng hoặc đã hết hạn", false, "ResetPass");
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
            Xác thực mã OTP
          </Text>

          <TouchableOpacity style={styles.inputContainer}>
            <Input
              placeholder="Mã OTP"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#BABABA",
                size: 20,
              }}
              inputMode="numeric"
              maxLength={6}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={otpInput}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(text) => onChangeOtp(text)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Xác thực"
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
