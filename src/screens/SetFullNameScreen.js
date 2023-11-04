import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../components/Loading";

export default function SetFullNameScreen({ route, navigation }) {
  const [fullname, setFullName] = useState("");
  const [isErrorName, setIsErrorName] = useState(false);

  const [loading, setLoading] = useState(false);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);

  const { username } = route.params;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsShowing(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsShowing(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const onChangeFullName = (text) => {
    setFullName(text);
    if (text == "") {
      setIsErrorName(true);
    } else {
      setIsErrorName(false);
    }
  };

  const onSubmit = () => {
    if (fullname == "") {
      setIsErrorName(true);
      showAlert("Vui lòng điền tên", false, "SetFullName");
      return;
    } else {
      setIsErrorName(false);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullname);
      service
        .put("/user", formData) 
        .then(
          (res) => {
            console.log("SetName OK");
            navigation.navigate("User");
            setLoading(false);
          },
          () => {
            console.log("Network failed");
            setLoading(false);
          }
        );
    }
  };

  return (
    <View className="flex-1 px-3">
      {loading && <Loading />}
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={keyboardIsShowing ? true : false}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.container}>
        <Text style={styles.noti}>Chào mừng bạn đến với ứng dụng</Text>
        <Image
          source={require("../../assets/reset_password.png")}
          style={{
            position: "absolute",
            top: 110,
            width: 300,
            height: 300,
            alignSelf: "flex-end",
          }}
        />
        <Text style={styles.title}>Tên của bạn là</Text>
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View>
            <TextInput
              style={styles.textField}
              label="Full Name"
              value={fullname}
              mode="outlined"
              error={isErrorName}
              onChangeText={(text) => onChangeFullName(text)}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => onSubmit()}
          >
            <Text style={styles.cfText}>Vào trang cá nhân {"\u2192"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = {
  container: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 80 : 50,
  },
  noti: {
    fontSize: 30,
    maxWidth: 250,
    fontWeight: "400",
  },
  title: {
    marginTop: 220,
    fontSize: 35,
    fontWeight: "400",
  },
  textField: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    top: 30,
  },
  confirmButton: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#687DAA",
    borderColor: "black",
  },
  cfText: {
    fontSize: 14,
    letterSpacing: 2.2,
    color: "white",
  },
};
