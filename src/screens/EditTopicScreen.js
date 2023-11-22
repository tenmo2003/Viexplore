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
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Loading from "../components/Loading";
import { showAlert } from "../helper/CustomAlert";
import service from "../helper/axiosService";
import { useNavigation } from '@react-navigation/native';

function EditPostScreen ({ navigation }) {
    //logic
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        console.log("name: ", name);
        console.log("content: ", content);
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);

        setLoading(true);
        service
            .post("/topic", formData)
            .then(
                (res) => {
                    console.log("Message: " + res.data.message);
                    setLoading(false);
                    if (res.data.name) {
                        console.log("Name: " + res.data.name);
                    }
                
                    if (res.data.content) {
                    console.log("Content: " + res.data.content);
                    }

                    navigation.navigate('Forum');
                })
            .catch((error) => {
                console.log("Network failed", error);
                setLoading(false);
            });
            
            
    };

    const onChangeName = (input) => {
        setName(input);
    };
    
    const onChangeContent = (input) => {
        setContent(input);
    };

    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        setLoading(true);
        service.get("/users/me", {}).then(
          (res) => {
            const userData = res.data.results;
            setFullName(userData.fullName);
            setUsername(userData.username);
            setAvatar(userData.avatar);
            setLoading(false);
          },
          () => {
            console.log("failed");
          }
        );
    }, []);

    return (
        <View>
            {loading && <Loading />}
            <ScrollView>
                <View style={styles.sheetScreen}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingRight: 15, paddingLeft: 10, paddingTop: 10 }}>
                        <TouchableOpacity>
                            <Icon name="chevron-left" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("Forum")}/>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, alignItems:"center", paddingLeft: 15 }}> Tạo bài viết</Text>
                        <TouchableOpacity onPress={() => onSubmit()}>
                            <Text style={{ fontSize: 18, color: "#687DAA", fontWeight: "bold" }} >Đăng</Text>
                        </TouchableOpacity>
                        </View>
                
                        <View style={styles.flexColumn}>
                            <View style={{ flexDirection: "row", marginBottom: 15 }}>
                                <View style={styles.profileImage}>
                                    <Image
                                    source={avatar ? { uri: avatar } : require("./../../assets/ava.png")}
                                    style={styles.image}
                                    resizeMode="center"
                                    ></Image>
                                </View>
                                <View>
                                    <Text style={styles.Name}>{fullname}</Text>
                                    <Text style={styles.Time}>{username}</Text>
                                </View>
                            </View>

                            <View style={styles.center}>
                            <View style={{...styles.postContent, height: postHeight*0.15}}>
                                <TextInput
                                    placeholder="Tiêu đề:"
                                    style={styles.textPost}
                                    onChangeText={(value) => onChangeName(value)}
                                />
                            </View>
                            <View style={styles.postContent}>
                                <TextInput
                                multiline={true}
                                maxLength={400}
                                style={styles.textPost}
                                placeholder="Hãy thêm kỷ niệm đẹp...."
                                onChangeText={(value) => onChangeContent(value)}
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

                            <View style={styles.containerButton}>
                                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                                    <Text style={styles.buttonText}>Đăng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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