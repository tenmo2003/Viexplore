import React from "react";
import { View, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Input, Button, Text } from "react-native-elements";

export default function LoginScreen() {
  return (
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
        />
      </TouchableOpacity>

      <Text style={{ marginBottom: 15 , marginTop: 20 , textDecorationLine: "underline" }}>Forgot password?</Text>
      <Text style={{ marginBottom: 25 , fontWeight: "bold" , fontSize: 14 }}> ______________________  OR  ______________________ </Text>

      <TouchableOpacity style={ styles.btn }>
        <Button
          title="Signup"
          titleStyle={{ color: "white", fontSize: 30 }}
          buttonStyle={ styles.signupButton }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#AACCFF", // Mã màu nền
  },

  img: {
    width:Dimensions.get("window").width, 
    height: 300,
    marginTop: 20,
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