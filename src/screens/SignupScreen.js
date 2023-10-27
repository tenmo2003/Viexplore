import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  const onSubmit = () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("confirmpass: ", confirmPassword);

    if (password !== confirmPassword) {
      showAlert("Passwords don't match", false, "Login");
      return;
    }

    service
      .post("/signup", {
        username: username,
        password: password,
        email: email,
        role: "ROLE_USER",
      })
      .then(
        (res) => {
          console.log(res.data.message);
          if (res.data.message === "User already exists") {
            showAlert(res.data.message, false, "Login");
          } else {
            showAlert("Signed up successfully", true, "Login");
          }
        },
        () => {
          console.log("Network failed");
        }
      );
  };

  const onChangeUsername = (input) => {
    setUsername(input);
  };

  const onChangePassword = (input) => {
    setPassword(input);
  };

  const onChangeConfirmPassword = (input) => {
    setConfirmPassword(input);
  };

  const onChangeEmail = (input) => {
    setEmail(input);
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/signup.png")}
            style={styles.img}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#BABABA",
                size: 20,
              }}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(value) => onChangeEmail(value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Username"
              leftIcon={{
                type: "font-awesome",
                name: "user",
                color: "#BABABA",
              }}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(value) => onChangeUsername(value)}
            />
          </View>
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
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(value) => onChangePassword(value)}
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
              leftIconContainerStyle={styles.leftIconStyle}
              onChangeText={(value) => onChangeConfirmPassword(value)}
            />
          </View>
          <TouchableOpacity style={styles.btn}>
            <Button
              title="Signup"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={styles.signupButton}
              onPress={() => onSubmit()}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ textDecorationLine: "underline" }}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { height, width } = Dimensions.get("window");
const standarWidth = 360;
const standardHeight = 800;
const imgWidth = (500 / standarWidth) * width;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#AACCFF", // Mã màu nền
  },

  img: {
    width: imgWidth,
    height: "35%",
    aspectRatio: 2.5 / 2,
    marginTop: Dimensions.get("window").width < 768 ? 20 : 60,
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
    backgroundColor: "#687DAA",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    padding: 0,
  },
};