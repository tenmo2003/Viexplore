import React, {useState, useEffect, useRef} from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';

function CommentScreen ({ navigation }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });
        
                if (!result.cancelled) {
                  const updatedImages = [...result.assets];
                  setSelectedImages(updatedImages);
                  console.log(updatedImages);
                }
            }
        } catch (error) {
          console.log("No image was picked");
        }
    };
        
    //bỏ chọn ảnh
    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    //KeyboardHeight
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (event) => {
            const keyboardHeight = event.endCoordinates.height;
            setKeyboardHeight(keyboardHeight);
            setKeyboardVisible(true);
            console.log((keyboardHeight))
        }
        );

        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardHeight(0);
            setKeyboardVisible(false);
        }
        );

        return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
        };
    }, []);   

    return (
        
        <View style={styles.sheetScreen}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: 15, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, }}>
                <TouchableOpacity>
                    <Icon name="chevron-left" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("Forum")}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, alignItems:"center", paddingLeft: 15 }}> Bình luận </Text>
                <TouchableOpacity>
                    <Ionicons
                        name="flag-outline"
                        size={27}
                        color="#52575D"
                        style={styles.iconStyle}
                    ></Ionicons>
                </TouchableOpacity>
            </View>

            <View style={{height: screenHeight-screenHeight*0.09}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ flexDirection: "row", marginBottom:10 }}>
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
                        <View>
                            <Image
                            source={require("../../assets/cho.jpg")}
                            style={styles.cmtImg}
                            ></Image>
                        </View>
                        <Text style={{...styles.Time, fontStyle:"italic"}}>xx:xx dd/mm/yy</Text>
                    </View>
                    
                </ScrollView>
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
                    <View style={{alignItems: 'flex-end'}}>
                        <Ionicons
                        name="image-outline"
                        size={27}
                        color="#52575D"
                        style={styles.cmtIcon}
                        onPress={pickImage}
                        ></Ionicons>
                    </View>
                </View>
                
                {selectedImages && (
                    <View style={{ flexDirection: "row", justifyContent: "center",}}>
                        {selectedImages.map((image, index) => (
                            <View key={index} style={{ marginLeft: 5, marginBottom: 5}}>
                                <Image source={{ uri: image.uri }} style={styles.postimg} />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => handleDeleteImage(index)}
                                >
                                    <Ionicons name="close-outline" size={18} color="white"></Ionicons>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    )
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
    postimg: {
        width: (100/standarWidth)*screenWidth,
        height: (100/standarWidth)*screenWidth,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    profileImage: {
        marginLeft: (10/standarWidth)*screenWidth,
        width: 50,
        height: 50,
        overflow: "hidden",
    },
    rightIconStyle: {
        paddingRight: 12,
    },
    leftIconStyle: {
        marginRight: 5,
    },
    Name: {
        marginLeft: 15,
        marginTop: 2,
        fontSize: 18,
        fontWeight: "bold",
    },
    Time: {
        color: "gray",
        marginLeft: 15,
        marginTop: 2,
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
    img: {
        borderRadius: 50,
        width: 80,
        height: 80,
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
    
    sheetScreen: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingHorizontal: 12,
        paddingBottom: 20,
        minHeight: screenHeight - screenHeight*0.09,
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
        marginLeft: 10,
        bottom: 70,
        backgroundColor: "white",
    },
    inputContainer2: {
        width: screenWidth - 70,
        flexDirection: "row"
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
    cmtIcon: {
        marginTop: 10,
        marginLeft:5,
    },
    cmtImg: {
        height: 100,
        resizeMode: "contain"
    }
    
});

export default CommentScreen;