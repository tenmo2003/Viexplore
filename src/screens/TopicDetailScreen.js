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

export default function TopicDetailScreen({ route, navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useContext(TokenContext);
  const [saveTopic, setSaveTopic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UpVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const { id } = route.params
  const {topic, setTopic} = useState([]);

//   useEffect(() => {
//     token ? setIsLogin(true) : setIsLogin(false);

//     if (token) {
//         service.get("/users/me", {}).then(
//             (res) => {
//                 const savedTopics = res.data.results.savedTopics;
//                 const username = res.data.results.username;
//                 for (let i = 0; i < savedTopics.length; i++) {
//                     if (savedTopics[i].id === id)
//                     setSaveTopic(!saveTopic);
//                 }

//                 const votedList = topic.votesList;
//                 for (let i = 0; i < votedList.length; i++) {
//                     if (votedList[i].username === username) {
//                     if (votedList[i].value === 1) setUpVoted(!UpVoted);
//                     if (votedList[i].value === -1) setDownVoted(!downVoted);
//                     }
//                 }
//                 setLoading(false);
//             },
//             () => {
//                 setLoading(false);
//                 console.log("failed to load savedTopic list");
//             }
//         ); 
//     }
//   }, [token]);

//   const handleSaveTopicPress = () => {
//     if (isLogin) {
//       if (saveTopic) {
//         setSaveTopic(false);
//         service
//           .delete("/unsave-topic/" + item.item.id)
//           .then((res) => {})
//           .catch((error) => {
//             setSaveTopic(true);
//             console.error("Delete Failed:", error);
//           });
//       } else {
//         setSaveTopic(true);
//         service
//           .post("/save-topic/" + item.item.id)
//           .then((res) => {})
//           .catch((error) => {
//             setBookmarked(false);
//             console.error("Post Failed:", error);
//           });
//       }
//     } else {
//       showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
//     }
//   };

//   const upVote = () => {
//     if (isLogin) {
//       if (UpVoted) {
//         service
//           .delete("/unvote/" + item.item.id)
//           .then((res) => {
//             console.log("Message: " + res.data.message);
//             setUpVoted(!UpVoted);
//           })
//           .catch((error) => {
//             console.log("Network failed", error);
//           });
//       } else {
//         service
//           .put("/upvote/" + item.item.id)
//           .then((res) => {
//             console.log("Message: " + res.data.message);
//             setUpVoted(!UpVoted);
//           })
//           .catch((error) => {
//             console.log("Network failed", error);
//           });
//       }
//     } else {
//       showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
//     }
//   };

//   const downVote = () => {
//     if (isLogin) {
//       if (downVoted) {
//         service
//           .delete("/downvote/" + item.item.id)
//           .then((res) => {
//             console.log("Message: " + res.data.message);
//             setDownVoted(!downVoted);
//           })
//           .catch((error) => {
//             console.log("Network failed", error);
//           });
//       } else {
//         service
//           .put("/downvote/" + item.item.id)
//           .then((res) => {
//             console.log("Message: " + res.data.message);
//             setDownVoted(!downVoted);
//           })
//           .catch((error) => {
//             console.log("Network failed", error);
//           });
//       }
//     } else {
//       showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
//     }
//   };

    return (
        <View style={styles.sheetScreen}>
            <View style={{ flexDirection: "row", alignItems: 'center', paddingRight: 15, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}>
                <TouchableOpacity>
                    <Icon name="chevron-left" type="font-awesome" color="#000" size={24} onPress={() => navigation.navigate("User")} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginLeft: 'auto', marginRight: 'auto' }}> Bài viết </Text>
            </View>
        

            <View style={{flexDirection: "row",}}>
                <View style={styles.profileImage}>
                <Image
                    source={require("./../../assets/cho.jpg")}
                    style={styles.image}
                    resizeMode="center"
                ></Image>
                </View>
                <View>
                <Text style={styles.Name}>Author</Text>
                <Text style={styles.Time}>time</Text>
                </View>
            </View>
            <Text style={styles.topicName}>name</Text>
            <Text style={styles.Decript}>content</Text>
            {/* <ImageSlider
                data={item.item.images.map((img) => ({
                img,
                }))}
                caroselImageContainerStyle={styles.caroselImageContainerStyle}
                activeIndicatorStyle={styles.activeIndicatorStyle}
                indicatorContainerStyle={styles.indicatorContainerStyle}
                preview={false}
            /> */}

            <View style={styles.center}>
                <View
                style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 15,
                }}
                >
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <TouchableOpacity>
                    <Ionicons
                        name={UpVoted ? "arrow-up-outline" : "arrow-up-outline"}
                        size={30}
                        color={UpVoted ? "#AACCFF" : "#52575D"}
                        style={{
                        marginRight: 5,
                        }}
                        //onPress={upVote}
                    />
                    </TouchableOpacity>
                    <Text
                    style={{
                        fontSize: 18,
                        color: "#52575D",
                    }}
                    >
                    Vote
                    </Text>
                    <TouchableOpacity>
                    <Ionicons
                        name={downVoted ? "arrow-down-outline" : "arrow-down-outline"}
                        size={30}
                        color={downVoted ? "#AACCFF" : "#52575D"}
                        style={{
                        marginLeft: 5,
                        }}
                        //onPress={downVote}
                    />
                    </TouchableOpacity>
                </View>
                <Ionicons
                    name="chatbubble-outline"
                    size={27}
                    color="#52575D"
                    style={styles.iconStyle}
                ></Ionicons>

                <Ionicons
                    name={saveTopic ? "flag" : "flag-outline"}
                    size={27}
                    color={saveTopic ? "#AACCFF" : "#52575D"}
                    style={styles.iconStyle}
                    //onPress={handleSaveTopicPress}
                ></Ionicons>

                </View>
            </View>
            <View style={styles.Rectangle} />

            <Text>List comment nma tao mệc quá làm sau nhe :D</Text>
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