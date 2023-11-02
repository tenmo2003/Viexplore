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
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';

function CreatePostScreen ({ navigation }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const pickMultipleImages = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted) {
                const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                });
        
                if (!result.cancelled) {
                const updatedImages = [...selectedImages, ...result.assets];
                setSelectedImages(updatedImages);
                console.log(updatedImages);
                }
            }
        } catch (error) {
        console.error("Error picking images:", error);
        }
    };
        
    //bỏ chọn ảnh
    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    return (
        <ScrollView>
            <View style={styles.sheetScreen}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: 15, paddingLeft: 10, paddingTop: 10 }}>
                    <TouchableOpacity>
                        <Icon name="chevron-left" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("Forum")}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, alignItems:"center", paddingLeft: 15 }}> Tạo bài viết</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, color: "#687DAA", fontWeight: "bold" }}>Đăng</Text>
                    </TouchableOpacity>
                    </View>
            
                    <View style={styles.flexColumn}>
                        <View style={{ flexDirection: "row", marginBottom: 15 }}>
                            <View style={styles.profileImage}>
                                <Image
                                source={require("./../../assets/cho.jpg")}
                                style={styles.image}
                                resizeMode="center"
                                ></Image>
                            </View>
                            <View>
                                <Text style={styles.Name}>MingMing</Text>
                                <Text style={styles.Time}>Username vì t bí layout</Text>
                            </View>
                        </View>

                        <View style={styles.center}>
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
                        
                        {selectedImages && (
                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center",}}>
                            {selectedImages.map((image, index) => (
                                <View key={index} style={{ marginLeft: 5, marginBottom: 5, position: 'relative' }}>
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

                        <View style={styles.containerButton}>
                            <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Đăng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        marginTop: 2,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    profileImage: {
        marginTop: 10,
        marginLeft: (20/standarWidth)*screenWidth,
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
        marginTop: 12,
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
        width: postWidth * 0.85,
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
});

export default CreatePostScreen;