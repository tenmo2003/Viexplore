import React from "react";
import { View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import { Input, Button, Text } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoidingContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={require("../../assets/login.png")} style={styles.img} />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Username"
              leftIcon={{ type: "font-awesome", name: "user",  color: "#BABABA" }}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              leftIconContainerStyle={styles.leftIconStyle}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock" , color: "#BABABA" }}
              secureTextEntry={true}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              leftIconContainerStyle={styles.leftIconStyle}
            />
          </View>
          <TouchableOpacity style={ styles.btn }>
            <Button
              title="Login"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={ styles.loginButton }
              onPress={() => navigation.navigate("User")}
            />
          </TouchableOpacity>

          <Text 
            style={{ marginBottom: 15 , marginTop: 20 , textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("MailResetPass")}>Forgot password?</Text>
            
          <Text style={{ marginBottom: 25 , fontWeight: "bold" , fontSize: 14 }}> ______________________  OR  ______________________ </Text>

          <TouchableOpacity style={ styles.btn }>
            <Button
              title="Signup"
              titleStyle={{ color: "white", fontSize: 30 }}
              buttonStyle={ styles.signupButton }
              onPress={() => navigation.navigate("Signup")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 800;
const imgWidth = 500/standarWidth * width;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#AACCFF", // Mã màu nền
  },

  img: {
    width: imgWidth, 
    height: "35%",
    aspectRatio: 2.5/2,
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
 
}