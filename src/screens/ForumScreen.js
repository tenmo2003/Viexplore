import React, {useState, useEffect} from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";


function ForumScreen({ navigation }) {
  return (
    <ScrollView style={Platform.OS === "ios" && { paddingTop: 30 }}>
      <View style={{ flexDirection: "row", marginBottom: 15}}>
        <View style={styles.profileImage}>
          <Image
            source={require("./../../assets/cho.jpg")}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
          <View style={styles.inputContainer}>
            <Button
              title="Hãy thêm kỷ niệm đẹp...."
              iconRight
              icon={{
                type: "font-awesome",
                name: "image",
                color: "#BABABA",
              }}
              buttonStyle={styles.inputContainerStyle}
              titleStyle={styles.titleStyle}
              onPress={() => navigation.navigate("CreatePost")}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Rectangle} />

      {/* Code for ở đây */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("./../../assets/cho.jpg")}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>
        <View>
          <Text style={styles.Name}>MingMing</Text>
          <Text style={styles.Time}>1 giờ trước</Text>
        </View>
      </View>
      <Text style={styles.Decript}>Haizz xấu ỉa</Text>
      <Image
        source={require("./../../assets/cho.jpg")}
        style={styles.image2}
      ></Image>

      <View style={styles.center}>
        <View style={{ flexDirection: "row", marginTop: 10 , marginBottom: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Ionicons name="arrow-up-outline" size={30} color="#52575D" style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: '#52575D' }}>Vote</Text>
            <TouchableOpacity>
              <Ionicons name="arrow-down-outline" size={30} color="#52575D" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>
          <Ionicons
            name="chatbubble-outline"
            size={27}
            color="#52575D"
            style={styles.iconStyle}
            onPress={() => navigation.navigate("Comment")}
          ></Ionicons>
          <Ionicons
            name="flag-outline"
            size={27}
            color="#52575D"
            style={styles.iconStyle}
          ></Ionicons>
        </View>
      </View>
      
      <View style={styles.Rectangle} />
      
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const standarWidth = 360;
const standardHeight = 800;

const postHeight = screenHeight * 0.5;
const postWidth = screenWidth;

const styles = StyleSheet.create({
  text: {
    color: "#52575D",
    top: 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 100,
  },
  image2: {
    flex: 1,
    width: Dimensions.get("window").width,
    marginTop: 20,
  },
  profileImage: {
    marginTop: 20,
    marginLeft: 15,
    width: 50,
    height: 50,
    overflow: "hidden",
  },
  inputContainer: {
    width: Dimensions.get("window").width - 100,
    marginLeft: 15,
    flex: 1,
  },
  titleStyle: {
    color: "#BABABA",
    marginLeft: "auto",
    paddingLeft: 5,
  },
  inputContainerStyle: {
    borderRadius: 50,
    borderColor: "gray",
    borderWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "white",
    height: 46,
    marginTop: 20,
  },

  rightIconStyle: {
    paddingRight: 12,
  },
  leftIconStyle: {
    marginRight: 5,
  },
  Rectangle: {
    width: Dimensions.get("window").width,
    height: 10,
    backgroundColor: "#AEB5BC",
  },
  Name: {
    marginLeft: 15,
    marginTop: 22,
    fontSize: 18,
    fontWeight: "bold",
  },
  Time: {
    color: "gray",
    marginLeft: 15,
    marginTop: 2,
  },
  Decript: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    marginRight: 20,
  },

  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  img: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  iconStyle: {
    marginTop: 10,
    marginLeft: (75/standarWidth)*screenWidth,
  },

});

export default ForumScreen;
