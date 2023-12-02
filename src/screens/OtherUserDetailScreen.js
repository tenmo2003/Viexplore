import React, { useContext, useEffect, useState, useRef } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import {
    Feather,
    Octicons,
    MaterialCommunityIcons,
} from "react-native-vector-icons";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
    View,
} from "react-native";
import service, { removeHeaderConfig } from "../helper/axiosService";
import Loading from "../components/Loading";
import * as SecureStore from "expo-secure-store";
import TokenContext from "../contexts/TokenContext";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Topic from "../components/Topic";
import { Icon } from "react-native-elements";

const OtherUser = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullName] = useState("");
    const { username, avatar } = route.params;

    useEffect(() => {
        setLoading(true);
        service.get("/users/" + username).then(
            (res) => {
                setFullName(res.data.results.fullName)
                setLoading(false);
            }
        ).catch((err) => {
            setLoading(false);
            console.log("Get fullname failed", err);
        })
    }, [])

    const [data, setData] = useState([]);
    useEffect(() => {
        service.get('/topics/' + username).then(
            (res) => {
            setData(res.data.results);
        }).catch((err) => {
            console.log("Topics failed ", err);
        })
    }, []);

    const renderItem = ({item, index}) => <Topic item={item} navigation={navigation} />;

    return (
        <View style={styles.container}>
            {loading && <Loading full={false} />}
            <View style={styles.sheetScreen}>
                <View style={{ flexDirection: "row", alignItems: 'center', paddingRight: 15, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                    <TouchableOpacity>
                        <Ionicons name="chevron-back" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("Forum")} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginLeft: 'auto', marginRight: 'auto' }}> Trang cá nhân </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.profileImage}>
                    <Image 
                        source={{uri: avatar ? avatar : require("./../../assets/ava.png")}}
                        style={styles.image} 
                        resizeMode="center"></Image>
                </View>
                <View style={styles.info}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "bold" }]}>
                        {fullname}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                color: "#52575D",
                                fontSize: 14,
                                fontStyle: "italic",
                                marginBottom: 30,
                            },
                        ]}
                    >
                        {username}
                    </Text>
                </View>
                {/* <View style={styles.Rectangle} /> */}
                
                {data.reverse().map((item) => (
                    <Topic key={item.id} item={item} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C0D8FC",
    },
    Rectangle: {
        width: Dimensions.get("window").width,
        height: 2,
        backgroundColor: "#AEB5BC",
        marginTop: 30,
        marginBottom:10,
    },
    text: {
        // fontFamily: 'Cochin',
        color: "black",
        top: 5,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 100,
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
    },
    profileImage: {
        marginTop: 20,
        width: 75,
        height: 75,
        alignSelf: "center"
    },
    info: {
        position: "relative",
        alignSelf: "center",
        alignItems: "center",
    },
    content: {
        flexWrap: "wrap",
        margin: 5,
        left: 5,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: Dimensions.get("window").width / 3 - 13,
        height: Dimensions.get("window").height / 6 - 2,
        backgroundColor: "#92A9CD",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 2,
        borderColor: "black",
        borderWidth: 1,
    },
    name: {
        width: Dimensions.get("window").width / 3 - 13,
        height: 46,
        backgroundColor: "#ffff",
        paddingHorizontal: 2,
        paddingVertical: 2,
        alignSelf: "center",
        alignItems: "center",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        flex: 0.3,
        justifyContent: "center",
    }
})

export default OtherUser;