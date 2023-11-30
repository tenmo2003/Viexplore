import React, { useState, useEffect, useRef, useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "react-native-vector-icons";
import TokenContext from "../contexts/TokenContext";
import service from "../helper/axiosService";
import Loading from "../components/Loading";
import Topic from "../components/Topic";

export default function TopicDetailScreen({ route, navigation }) {
    const { id } = route.params
    const {topic, setTopic} = useState([]);

    return (
        <View style={styles.sheetScreen}>
            <View style={{ flexDirection: "row", alignItems: 'center', paddingRight: 15, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                <TouchableOpacity>
                    <Icon name="chevron-left" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("User")} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginLeft: 'auto', marginRight: 'auto' }}> Bài viết </Text>
            </View>
        
        {/* Component hiện ở đây */}
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
    sheetScreen: {
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingBottom: 20,
        minHeight: screenHeight - screenHeight * 0.09,
    },
    body: {
        height: screenHeight * 0.81,
    },

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
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 16,
        marginRight: 20,
    },

    topicName: {
        marginTop: 10,
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 24,
        marginRight: 20,
        marginBottom: 5,
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
        marginLeft: (75 / standarWidth) * screenWidth,
    },
    activeIndicatorStyle: {
        width: 12,
        height: 12,
        borderRadius: 12,
    },
    caroselImageContainerStyle: {
        backgroundColor: "#000",
        height: screenHeight * 0.65,
        justifyContent: "center",
    },
    indicatorContainerStyle: {
        position: "absolute",
        bottom: -10,
    },
});
