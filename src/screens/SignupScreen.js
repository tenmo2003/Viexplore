import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import Loading from "../components/Loading";
import { showAlert } from "../helper/CustomAlert";
import service from "../helper/axiosService";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("confirmpass: ", confirmPassword);

    if (password !== confirmPassword) {
      showAlert("Passwords don't match", false, "Login");
      return;
    }

    setLoading(true);
    service
      .post("/signup", {
        username: username,
        password: password,
        email: email,
      })
      .then(
        (res) => {
          console.log(res.data);
          if (res.data.message === "User already exists") {
            showAlert(res.data.message, false, "Login", navigation);
          } else {
            showAlert("Signed up successfully", true, "Login", navigation);
          }
          setLoading(false);
        },
        () => {
          console.log("Network failed");
          setLoading(false);
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
      {loading && <Loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        overScrollMode="never"
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
              autoCapitalize="none"
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
              autoCapitalize="none"
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

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 10,
              marginBottom: Dimensions.get("window").width < 768 ? 30 : 60,
            }}
          >
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
    marginTop: Platform.OS === "ios" ? (Dimensions.get("window").width < 768 ? 20 : 60) + 40 : 0,
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
