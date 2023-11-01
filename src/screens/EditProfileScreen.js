import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "react-native-elements";
import axios from "axios";
import Loading from "../components/Loading";

export default function EditProfileScreen({ route, navigation }) {
  const [newFullname, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [avatar, setAvatar] = useState();

  const [loading, setLoading] = useState(false);

  const { username } = route.params.userInfo;

  const onChangeFullName = (text) => {
    setNewFullName(text);
  };

  const onChangeEmail = (text) => {
    setNewEmail(text);
  };

  const onChangeBackToUser = () => {
    navigation.navigate("User");
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("image", {
      uri: avatar,
      name: "avatar.jpg",
      type: "image/jpg",
    });

    setLoading(true);

    if (avatar) {
      axios
        .all([
          service.put("/user", {
            username: username,
            fullName: newFullname,
            email: newEmail,
          }),
          service.put("/avatar", formData),
        ])
        .then(
          axios.spread((res1, res2) => {
            console.log(res1.data);
            console.log(res2.data);
            setLoading(false);
          })
        )
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      service
        .put("/user", {
          username: username,
          fullName: newFullname,
          email: newEmail,
        })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <View className="flex-1 px-3">
      {loading && <Loading />}

      <Button
        title="Back"
        containerStyle={{
          width: "50%",
        }}
        onPress={() => onChangeBackToUser()}
      />
      <Text style={{ marginVertical: 50, textAlign: "center", fontSize: 30 }}>
        EditProfileScreen
      </Text>

      {avatar && (
        <Avatar
          containerStyle={{ alignSelf: "center", marginBottom: 20 }}
          source={{ uri: avatar }}
          rounded
          size="large"
        />
      )}

      <Button
        containerStyle={{ width: "50%", alignSelf: "center" }}
        title="Choose avatar"
        onPress={() => pickImage()}
      />

      <TextInput
        style={{
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="New full name"
        value={newFullname}
        onChangeText={(text) => onChangeFullName(text)}
      />
      <TextInput
        style={{
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="Change email"
        value={newEmail}
        onChangeText={(text) => onChangeEmail(text)}
      />
      {/* <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          textAlign: "center",
          justifyContent: "center",
        }}
        placeholder="Choose avatar here"
        value={fullname}
        onChangeText={(text) => onChangeAvatar(text)}
      /> */}
      <Button title="Xác nhận" onPress={() => onSubmit()} />
    </View>
  );
}
