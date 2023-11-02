import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "react-native-elements";
import axios from "axios";
import Loading from "../components/Loading";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { TextInput } from "react-native-paper";

export default function EditProfileScreen({ route, navigation }) {
  const { username, fullname, email, avatar } = route.params.userInfo;

  const [newFullname, setNewFullName] = useState(fullname);
  const [newEmail, setNewEmail] = useState(email);
  const [newAvatar, setAvatar] = useState(avatar);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [loading, setLoading] = useState(false);

  const onChangeFullName = (text) => {
    setNewFullName(text);
    if (text == "") {
      setIsErrorName(true);
    } else {
      setIsErrorName(false);
    }
  };

  const onChangeEmail = (text) => {
    setNewEmail(text);
    if (text == "") {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
  };

  const onChangeBackToUser = () => {
    navigation.navigate("User");
  };

  const onSubmit = () => {
    if (newFullname == "" || newEmail == "") {
      setIsErrorName(true);
      setIsErrorEmail(true);
      return;
    } else {
      setIsErrorName(false);
      setIsErrorEmail(false);
      const formData = new FormData();
      if (newAvatar !== avatar) {
        formData.append("avatar", {
          uri: newAvatar,
          name: "avatar.jpg",
          type: "image/jpg",
        });
      }
      formData.append("username", username);
      formData.append("email", newEmail);
      formData.append("fullName", newFullname);

      setLoading(true);

      service
        .put("/user", formData)
        .then((res) => {
          setAvatar(res.data.results.avatar);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoading(false);
        });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <View className="flex-1 px-3">
      {loading && <Loading />}
      <View style={styles.container}>
        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
        <View
          style={
            Platform.OS === "ios"
              ? styles.profileImageContainer
              : styles.andrShadow
          }
        >
          <Avatar
            style={styles.profileImage}
            source={
              newAvatar ? { uri: newAvatar } : require("./../../assets/ava.png")
            }
            rounded
            avatarStyle={{ borderRadius: 65 }}
            onPress={() => pickImage()}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => pickImage()}
          >
            <SimpleLineIcons
              name="pencil"
              size={16.5}
              color="white"
            ></SimpleLineIcons>
          </TouchableOpacity>
        </View>
        {/* <DismissKeyboard> */}
        <View>
          <TextInput
            style={styles.textField}
            label="Full Name"
            value={newFullname}
            mode="outlined"
            error={isErrorName}
            onChangeText={(text) => onChangeFullName(text)}
          />
          <TextInput
            style={styles.emailstyle}
            label="E-mail"
            value={newEmail}
            mode="outlined"
            error={isErrorEmail}
            onChangeText={(text) => onChangeEmail(text)}
          />
        </View>
        {/* </DismissKeyboard> */}
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
    </View>
  );
}

const styles = {
  container: {
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 80 : 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  profileImageContainer: {
    top: 20,
    alignSelf: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  andrShadow: {
    top: 20,
    alignSelf: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    shadowColor: "black",
    elevation: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    justifyContent: "center",
  },

  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#687DAA",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginTop: 60,
  },
  emailstyle: {
    marginTop: 40,
    marginBottom: 35,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    top: 20,
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
