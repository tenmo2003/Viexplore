import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import {
    Dimensions,
    Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Input } from "react-native-elements";
import service, {
    getAllHeaderConfig,
    updateHeaderConfig,
} from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../components/Loading";

export default function UserOther({ route, navigation }) {
    const [fullname, setFullName] = useState("");
    const [isErrorName, setIsErrorName] = useState(false);

    const [loading, setLoading] = useState(false);
    const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);

      const { username } = route.params;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardIsShowing(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardIsShowing(false);
            }
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const onChangeFullName = (text) => {
        setFullName(text);
        if (text == "") {
            setIsErrorName(true);
        } else {
            setIsErrorName(false);
        }
    };

    const onSubmit = () => {
        if (fullname == "") {
            setIsErrorName(true);
            showAlert("Vui lòng điền tên", false, "SetFullName");
            return;
        } else {
            setIsErrorName(false);
            const formData = new FormData();
            formData.append("username", username);
            formData.append("fullName", fullname);
            service
                .put("/user", formData)
                .then(
                    (res) => {
                        console.log("SetName OK");
                        navigation.navigate("User");
                        setLoading(false);
                    },
                    () => {
                        console.log("Network failed");
                        setLoading(false);
                    }
                );
        }
    };

    return (
        <View className="flex-1 px-3" style={{ backgroundColor: "#AACCFF" }}>
            {loading && <Loading />}
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={keyboardIsShowing ? true : false}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/reset_password.png")}
                        style={styles.img}
                    />
                    <Text style={styles.noti}>Chào mừng bạn đã đến với Viexplore</Text>
                    <TouchableWithoutFeedback onPress={handlePressOutside}>
                        <View>
                            <TextInput
                                style={styles.textField}
                                label="Full Name"
                                value={fullname}
                                mode="outlined"
                                error={isErrorName}
                                onChangeText={(text) => onChangeFullName(text)}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => onSubmit()}
                        >
                            <Text style={styles.cfText}>Vào trang cá nhân {"\u2192"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

const { height, width } = Dimensions.get("window");
const standarWidth = 360;
const standardHeight = 800;
const imgWidth = (500 / standarWidth) * width;
const imgHeight = (550 / standardHeight) * width;

const styles = {
    container: {
        paddingTop: Platform.OS === "ios" ? 80 : 50,
    },
    img: {
        width: imgWidth,
        height: imgHeight,
        aspectRatio: 2.9 / 2,
        marginTop: Platform.OS === "ios" ? (Dimensions.get("window").width < 768 ? 20 : 60) + 40 : 0,
        alignSelf: "center"
    },
    noti: {
        marginTop: 20,
        fontSize: 26,
        alignSelf: "center",
    },
    buttonContainer: {
        flex: 1,
        alignSelf: "flex-end",
        top: 30,
        right: 25,
        
    },
    confirmButton: {
        padding: 15,
        borderRadius:50,
        borderWidth: 1,
        backgroundColor: "#687DAA",
        borderColor: "black",
    },
    cfText: {
        fontSize: 14,
        letterSpacing: 2.2,
        color: "white",
    },
    textField: {
        marginTop: 10,
        maxWidth: width * 0.9,
        alignItem: "center",
        marginLeft: 25,
        marginRight: 25,
    },
};
