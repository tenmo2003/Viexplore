import React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

function ForumScreen() {

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.profileImage}>
          <Image source={require('./../../assets/cho.jpg')} style={styles.image} resizeMode="center"></Image>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Hãy thêm kỷ niệm đẹp...."
            rightIcon={{ type: "font-awesome", name: "image", color: "#BABABA" }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            rightIconContainerStyle={styles.rightIconStyle}
          />
        </View>
      </View>
      <View style={styles.Rectangle} />

      {/* Code for ở đây */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.profileImage}>
          <Image source={require('./../../assets/cho.jpg')} style={styles.image} resizeMode="center"></Image>
        </View>
        <View>
          <Text style={styles.Name}>MingMing</Text>
          <Text style={styles.Time}>1 giờ trước</Text>
        </View>
      </View>
      <Text style={styles.Decript}>
        Haizz xấu ỉa
      </Text>
      <Image source={require('./../../assets/cho.jpg')} style={styles.image2} ></Image>
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <Ionicons name="heart-outline" size={30} color="#52575D" style={{ marginLeft: 10, marginTop: 8 }}></Ionicons>
        <Ionicons name="chatbubble-outline" size={27} color="#52575D" style={{ marginLeft: 10, marginTop: 8 }}></Ionicons>
        <Ionicons name="flag-outline" size={27} color="#52575D" style={{ marginLeft: 10, marginTop: 8 }}></Ionicons>
        <View style={styles.inputContainer2}>
          <Input
            placeholder="Bình luận của bạn..."
            leftIcon={{ type: "font-awesome", name: "user", color: "#BABABA" }}
            rightIcon={{ type: "font-awesome", name: "send", color: "#BABABA" }}
            inputContainerStyle={styles.inputContainerStyle2}
            inputStyle={styles.inputStyle2}
            leftIconContainerStyle={styles.leftIconStyle}
            rightIconContainerStyle={styles.rightIconStyle}
          />
        </View>
      </View>
      <View style={styles.Rectangle} />

    </ScrollView>
  );
}
const styles = StyleSheet.create(
  {
    text: {
      color: "#52575D",
      top: 5
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
      borderRadius: 100
    },
    image2: {
      flex: 1,
      width: Dimensions.get("window").width,
      marginTop: 20
    },
    profileImage: {
      marginTop: 20,
      marginLeft: 10,
      width: 50,
      height: 50,
      overflow: "hidden",

    },
    inputContainer: {
      width: "80%",
    },
    inputContainerStyle: {
      borderRadius: 50,
      borderColor: "gray",
      borderWidth: 2,
      borderBottomWidth: 2,
      backgroundColor: "white",
      height: 46,
      elevation: 5,
      shadowColor: "black",
      marginTop: 20,
      paddingLeft: 15
    },

    inputContainer2: {
      width: "70%",
    },
    inputContainerStyle2: {
      borderRadius: 50,
      borderColor: "gray",
      borderWidth: 2,
      borderBottomWidth: 2,
      backgroundColor: "white",
      height: 40,
      elevation: 5,
      shadowColor: "black",
      paddingLeft: 15,
      marginLeft: 10
    },
    rightIconStyle: {
      paddingRight: 12,
    },
    leftIconStyle: {
      marginRight:5
    },
    Rectangle: {
      width: Dimensions.get("window").width,
      height: 10,
      backgroundColor: "#AEB5BC",

    },
    Name: {
      marginLeft: 10,
      marginTop: 15,
      fontWeight: "bold",
    },
    Time: {
      color: "gray",
      marginLeft: 10
    },
    Decript: {
      marginTop: 10,
      marginLeft: 20,
      fontSize: 16,
      marginRight: 20,

    }

  }
)

export default ForumScreen;
