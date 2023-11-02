import React, {useState} from "react";
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
import Modal from "react-native-modal"
import * as ImagePicker from 'expo-image-picker';


function ForumScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedImages, setSelectedImages] = useState(null);

  //Cho phần comment
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!result.cancelled) {
          setSelectedImages([result]);
          console.log(result);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  
  //bỏ chọn ảnh
  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  
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
            onPress={() => setModalVisible(true)}
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

      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.popupPosi}
        avoidKeyboard={false}
      >
        <ScrollView>
        <View style={styles.sheetScreen}>
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
              <Text style={styles.Time}>Buồn ngủ quá bây ơi</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
              <Ionicons
                name="image-outline"
                size={27}
                color="#52575D"
                style={styles.cmtIcon}
              ></Ionicons>
            </View>
          </View>

          <View style={styles.commentInput}>
            <View style={styles.inputContainer2}>
              <Input
                placeholder="Bình luận của bạn..."
                leftIcon={{ type: "font-awesome", name: "user", color: "#BABABA" }}
                rightIcon={{ type: "font-awesome", name: "send", color: "#BABABA" , size: 20 }}
                inputContainerStyle={styles.inputContainerStyle2}
                inputStyle={styles.inputStyle2}
                leftIconContainerStyle={styles.leftIconStyle}
                rightIconContainerStyle={styles.rightIconStyle}
              />
            </View>
          </View>
        </View>
        </ScrollView>
      </Modal>
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

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  popupPosi: {
    justifyContent: "flex-end",
    margin: 0,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  userAva: {
    position: "absolute",
    top: -60,
    width: 86,
    height: 86,
    backgroundColor: "#bbb",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
  },
  img: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  userFullName: {
    color: "#000",
    fontSize: 24,
    marginTop: 45,
    fontWeight: "bold",
  },
  postContent: {
    borderWidth: 3,
    height: postHeight * 0.65,
    alignItems: "center",
    width: postWidth * 0.82,
    borderColor: "#000",
    borderRadius: 20,
  },
  flexStyle: {
    flex: 1,
  },
  containerView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  textPost: {
    marginVertical: Platform.OS === "ios" ? 10 : -5,
    padding: 15,
    borderColor: "#000",
    maxHeight: postHeight * 0.6,
    width: postWidth * 0.82,
    lineHeight: -0.5,
    fontSize: screenWidth / 25,
  },
  containerButton: {
    width: postHeight * 0.7,
  },
  button: {
    backgroundColor: "#687DAA",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  sheetScreen: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    borderWidth: 5,
    borderColor: "#000",
    height: screenHeight,
    paddingBottom: 20,
  },

  topLine: {
    width: screenWidth * 0.2,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#AEB5BC",
  },

  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'gray',
    borderRadius: 100,
    padding: 3,
  },

  commentInput: {
    position: 'absolute',
    bottom: 0,
  },
  inputContainer2: {
    width: screenWidth - 10,
    alignSelf: "center",
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
    marginTop: 5,
  },

  iconStyle: {
    marginTop: 10,
    marginLeft: (75/standarWidth)*screenWidth,
  },

  cmtIcon: {
    marginTop: 25,
    marginRight: 10,
  }
});

export default ForumScreen;
