import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import service from "../helper/axiosService";
import TokenContext from "../contexts/TokenContext";
import * as SecureStore from "expo-secure-store";
import { removeHeaderConfig } from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import { TextInput } from "react-native-paper";
import Loading from "../components/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Feather from "react-native-vector-icons/Feather";

export default function SecurtityScreen({ route, navigation }) {
  const [nowpassword, setNowPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNowPassword, setShowNowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);

  const [isErrorNowPassword, setIsErrorNowPassword] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorCfPassword, setIsErrorCfPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);

  const { username } = route.params;

  const { token, setToken } = useContext(TokenContext);

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

  const logOutHandler = () => {
    const removeToken = async () => {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      removeHeaderConfig("Authorization");
      navigation.navigate("Login");
    };
    removeToken();
  };

  const onChangeNowPassword = (text) => {
    setNowPassword(text);
  };

  const onChangeNewPassword = (text) => {
    setNewPassword(text);
    if (text.length >= 8) {
      setIsErrorPassword(false);
    } else {
      setIsErrorPassword(true);
    }
  };
  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (text.length >= 8) {
      setIsErrorCfPassword(false);
    } else {
      setIsErrorCfPassword(true);
    }
  };

  const showNowPasswordFunc = () => {
    setShowNowPassword(!showNowPassword);
  };

  const showNewPasswordFunc = () => {
    setShowNewPassword(!showNewPassword);
  };

  const showCfPasswordFunc = () => {
    setShowCfPassword(!showCfPassword);
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const onChangeBackToUser = () => {
    navigation.navigate("User");
  };

  const onSubmit = () => {
    console.log("username: ", username);
    console.log("passwordinput: ", nowpassword);
    console.log("newpassword: ", newpassword);
    console.log("confirmpass: ", confirmPassword);

    if (nowpassword == "" || newpassword == "" || confirmPassword == "") {
      if (nowpassword == "") {
        setIsErrorNowPassword(true);
        setIsErrorPassword(false);
        setIsErrorCfPassword(false);
      }
      if (newpassword == "") {
        setIsErrorPassword(true);
        setIsErrorNowPassword(false);
        setIsErrorCfPassword(false);
      }
      if (confirmPassword == "") {
        setIsErrorCfPassword(true);
        setIsErrorNowPassword(false);
        setIsErrorPassword(false);
      }
      showAlert("Không được để trống", false, "Securtity");
      return;
    } else if (newpassword.length < 8 || confirmPassword.length < 8) {
      setIsErrorNowPassword(false);
      setIsErrorPassword(true);
      setIsErrorCfPassword(true);
      showAlert("Mật khẩu phải có tối thiểu 8 kí tự", false, "Securtity");
      return;
    } else if (newpassword !== confirmPassword) {
      setIsErrorPassword(true);
      setIsErrorCfPassword(true);
      showAlert("Mật khẩu không trùng khớp", false, "Securtity");
      return;
    } else {
      setIsErrorNowPassword(false);
      setIsErrorPassword(false);
      setIsErrorCfPassword(false);
      service
        .put(`/change-password`, {
          newPassword: newpassword,
        })
        .then(
          (res) => {
            if (res.data.status === 200) {
              console.log("Mật khẩu hiện tại đúng", nowpassword);
              console.log("Đổi thành công", newpassword);
              showAlert("Đổi mật khẩu thành công", false, "Securtity");
              logOutHandler();
            } else {
              showAlert("Mật khẩu hiện tại không chính xác", false, "Security");
              setIsErrorNowPassword(true);
              return;
            }
          },
          () => {
            console.log("Network failed");
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
          <Text style={styles.username}>
            {username} {"\u00B7"} Viexplore
          </Text>
          <Text style={styles.title}>Đổi mật khẩu</Text>
          <Text style={styles.noti}>
            Bạn sẽ bị đăng xuất sau khi đổi mật khẩu để bảo vệ tài khoản
          </Text>
          <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View>
              <TextInput
                style={styles.textField}
                label="Mật khẩu hiện tại"
                value={nowpassword}
                mode="outlined"
                error={isErrorNowPassword}
                secureTextEntry={!showNowPassword}
                right={
                  <TextInput.Affix
                    text={
                      <Feather
                        name={showNowPassword ? "eye" : "eye-off"}
                        size={20}
                        color="black"
                        onPress={showNowPasswordFunc}
                      />
                    }
                  />
                }
                onChangeText={(text) => onChangeNowPassword(text)}
              />
              <TextInput
                style={styles.cfstyle}
                label="Mật khẩu mới"
                value={newpassword}
                mode="outlined"
                error={isErrorPassword}
                secureTextEntry={!showNewPassword}
                right={
                  <TextInput.Affix
                    text={
                      <Feather
                        name={showNewPassword ? "eye" : "eye-off"}
                        size={20}
                        color="black"
                        onPress={showNewPasswordFunc}
                      />
                    }
                  />
                }
                onChangeText={(text) => onChangeNewPassword(text)}
              />
              <TextInput
                style={styles.cfstyle}
                label="Nhập lại mật khẩu mới"
                value={confirmPassword}
                mode="outlined"
                error={isErrorCfPassword}
                secureTextEntry={!showCfPassword}
                right={
                  <TextInput.Affix
                    text={
                      <Feather
                        name={showCfPassword ? "eye" : "eye-off"}
                        size={20}
                        color="black"
                        onPress={showCfPasswordFunc}
                      />
                    }
                  />
                }
                onChangeText={(text) => onChangeConfirmPassword(text)}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => onChangeBackToUser()}
            >
              <Text style={styles.buttonText}>Thoát</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onSubmit()}
            >
              <Text style={styles.cfText}>Xác nhận</Text>
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
  username: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  noti: {
    maxWidth: 250,
    fontSize: 17,
  },
  textField: {
    marginTop: 60,
  },
  cfstyle: {
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    top: 40,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 2.2,
    color: "black",
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
