import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity,Image } from "react-native";
import service, {
  getAllHeaderConfig,
  updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import { Ionicons } from "react-native-vector-icons";

export default function SetFullNameScreen({ route, navigation }) {
  const [newFullname, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { userInfo } = route.params;

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
    console.log("fullName: ", newFullname);
    console.log("email: ", userInfo.email);
    console.log("username: ", userInfo.username);

    service
      .put("/user", {
        fullName: newFullname,
        email: newEmail,
      })
      .then(
        (res) => {
          showAlert("Edited successfully", false, "EditProfile");
          console.log("Edit ok", newFullname /*newEmail*/);
          service.get("/users/me", {}).then((res) => {
            if (res.data.status === 200) {
              navigation.navigate("User");
            }
          });
        },
        () => {
          console.log("Network failed");
        }
      );
  };

  return (

    <View style={styles.headcontainer} >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onChangeBackToUser()}
        >
          <Ionicons name="close-outline" style={{ fontSize: 35 }}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.textheader}>Chỉnh sửa hồ sơ</Text>
        <TouchableOpacity
          onPress={() => onSubmit()}
        >
          <Ionicons name="checkmark" style={{ fontSize: 35, color: '#3493D9' }}></Ionicons>
        </TouchableOpacity>
      </View>

      <View style = {{padding:20,alignItems:'center'}}>
        <Image 
        source={require("./../../assets/cho.jpg")} 
        style={styles.img}/>
        <Text style = {styles.textchange}>
          Thay đổi ảnh đại diện
        </Text>
      </View>
      <View style = {{padding :10}}>
        <Text style = {{opacity:0.5,fontSize:18}}>Tên đầy đủ</Text>
          <TextInput 
              placeholder="Tên đầy đủ"
              defaultValue={userInfo.fullname}
              style = {styles.Info}
              value={newFullname}
              onChangeText={(text) => onChangeFullName(text)}
          />
      </View>

      <View style = {{padding :10}}>
        <Text style = {{opacity:0.5,fontSize:18}}>Email</Text>
          <TextInput 
              placeholder="Email"
              defaultValue={userInfo.email}
              style = {styles.Info}
              value={newEmail}
              onChangeText={(text) => onChangeEmail(text)}
          />
      </View>      
    </View>
  
  );
  
}
const styles = {
  headcontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  textheader: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  img:{
    width:80,
    height:80,
    borderRadius:100
  },
  textchange: {
    color : '#3493D9',
  },
  Info:{
    marginTop:5,
    fontSize:16,
    borderBottomWidth:1,
    borderColor:'#CDCDCD'
  }
};
