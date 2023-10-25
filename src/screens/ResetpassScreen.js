import React from "react";
import { View, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import { Input, Button, Text } from "react-native-elements";

export default function ResetpassScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.keyboardAvoidingContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <Image source={require("../../assets/signup.png")} style={styles.img} />

            <Text style={{ fontWeight: "bold", fontSize: 30, marginBottom: 20 }}>
                Reset Password
            </Text>

            <View style={styles.inputContainer}>
                <Input
                placeholder="Email"
                leftIcon={{ type: "font-awesome", name: "envelope",  color: "#BABABA" , size: 20}}
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
            <View style={styles.inputContainer}>
                <Input
                placeholder="Confirm password"
                leftIcon={{ type: "font-awesome", name: "lock" , color: "#BABABA" }}
                secureTextEntry={true}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                leftIconContainerStyle={styles.leftIconStyle}
                />
            </View>
            <TouchableOpacity style={ styles.btn }>
                <Button
                title="Reset password"
                titleStyle={{ color: "white", fontSize: 30 }}
                buttonStyle={ styles.signupButton }
                onPress={() => navigation.navigate("Login")}
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

  signupButton: {
    backgroundColor: "#FF6B06",
    borderRadius: 50,
    borderColor: "black", 
    borderWidth: 2,
    padding: 0,
  },

}