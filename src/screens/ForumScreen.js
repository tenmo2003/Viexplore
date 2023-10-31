import React, {useState} from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import Modal from "react-native-modal"
import * as ImagePicker from 'expo-image-picker';


function ForumScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (result.selected === '') {
      console.log("No images were selected.");
    } else {
      setSelectedImages(result.selected.map((item) => item.uri));
    }
    
  };
  
  const pickMultipleImages = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true, // Cho phép chọn nhiều ảnh
        });

        if (!result.canceled) {
          setSelectedImages(result.assets);
          console.log(result.assets);
        }
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
    
  };
  

  return (
    <ScrollView style={Platform.OS === "ios" && { paddingTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.profileImage}>
          <Image
            source={require("./../../assets/cho.jpg")}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.inputContainer} >
            <Input
              placeholder="Hãy thêm kỷ niệm đẹp...."
              rightIcon={{
                type: "font-awesome",
                name: "image",
                color: "#BABABA",
              }}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              rightIconContainerStyle={styles.rightIconStyle}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </TouchableOpacity>
        
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
        avoidKeyboard={true}
      >
        <View style={styles.bottomSheetScreen}>
          <View style={styles.center}>
              <View style={styles.flexColumn}>
                <View style={styles.center}>
                  <View style={styles.userAva}>
                    <Image
                      source={require("../../assets/ava.png")}
                      style={styles.img}
                    />
                  </View>
                  <Text style={styles.userFullName}>Tên người dùng</Text>
                  <View style={styles.postContent}>
                    <TextInput
                      multiline={true}
                      maxLength={400}
                      style={styles.textPost}
                      placeholder="Hãy thêm kỷ niệm đẹp...."
                    ></TextInput>
                    <Icon
                      type="font-awesome"
                      name="image"
                      color="#BABABA"
                      size={30}
                      containerStyle={{ bottom: 10, right:10,position:"absolute"}}
                      onPress={pickMultipleImages}
                    />
                  </View>

                  {selectedImages&&
                    <View>
                      {selectedImages.map((image, index) => (
                        <View>
                          <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                        </View>
                      ))}
                    </View>
                  }

                  <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Đăng</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
          </View>
        </View>
      </Modal>

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

      <View style={{ flexDirection: "row", marginTop: 10 , marginBottom: 15 }}>
        <Ionicons
          name="heart-outline"
          size={30}
          color="#52575D"
          style={{ marginLeft: 10, marginTop: 10 }}
        ></Ionicons>
        <Ionicons
          name="chatbubble-outline"
          size={27}
          color="#52575D"
          style={{ marginLeft: 10, marginTop: 10 }}
          onPress={() => setModalVisible2(true)}
        ></Ionicons>
        <Ionicons
          name="flag-outline"
          size={27}
          color="#52575D"
          style={{ marginLeft: 10, marginTop: 10 }}
        ></Ionicons>
        
      </View>
      <View style={styles.Rectangle} />

      <Modal
        onBackdropPress={() => setModalVisible2(false)}
        onBackButtonPress={() => setModalVisible2(false)}
        isVisible={isModalVisible2}
        swipeDirection="down"
        onSwipeComplete={toggleModal2}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.popupPosi}
        avoidKeyboard={true}
      >
        <View style={styles.commentSheetScreen}>
          <View style={styles.center}>
            <View style={styles.flexColumn}>
              <View style={styles.center}>
                <View style={styles.topLine} />
                
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
                </View>
                
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
          </View>
        </View>
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
    width: Dimensions.get("window").width - 70,
    
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
    paddingLeft: 15,
  },

  inputContainer2: {
    width: screenWidth - 110,
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
  bottomSheetScreen: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    borderWidth: 5,
    borderColor: "#000",
    minHeight: postHeight,
    paddingBottom: 20,
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

  commentSheetScreen: {
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

});

export default ForumScreen;
