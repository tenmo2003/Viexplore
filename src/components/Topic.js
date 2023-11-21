import React, { useState, useEffect, useRef, useContext, memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ImageSlider2 from "./ImageSlide2";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "react-native-vector-icons";
import TokenContext from "../contexts/TokenContext";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import Loading from "../components/Loading";

const Topic = ({ item, navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useContext(TokenContext);
  const [saveTopic, setSaveTopic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UpVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [votes, setVotes] = useState(item.item.votes);

  useEffect(() => {
    token ? setIsLogin(true) : setIsLogin(false);

    if (token) {
      service.get("/users/me", {}).then(
        (res) => {
          const savedTopics = res.data.results.savedTopics;
          const username = res.data.results.username;
          for (let i = 0; i < savedTopics.length; i++) {
            if (savedTopics[i].id === item.item.id) setSaveTopic(!saveTopic);
          }

          const votedList = item.item.votesList;
          for (let i = 0; i < votedList.length; i++) {
            if (votedList[i].username === username) {
              if (votedList[i].value === 1) {
                setUpVoted(!UpVoted);
              }
              if (votedList[i].value === -1) {
                setDownVoted(!downVoted);
              }
            }
          }

          setLoading(false);
        },
        () => {
          setLoading(false);
          console.log("failed to load savedTopic list");
        }
      );
    }
  }, [token]);

  const handleSaveTopicPress = () => {
    if (isLogin) {
      if (saveTopic) {
        setSaveTopic(false);
        service
          .delete("/unsave-topic/" + item.item.id)
          .then((res) => { })
          .catch((error) => {
            setSaveTopic(true);
            console.error("Delete Failed:", error);
          });
      } else {
        setSaveTopic(true);
        service
          .post("/save-topic/" + item.item.id)
          .then((res) => { })
          .catch((error) => {
            setBookmarked(false);
            console.error("Post Failed:", error);
          });
      }
    } else {
      showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
    }
  };

  const upVote = () => {
    if (isLogin) {
      const endpoint = UpVoted ? "/unvote/" : "/upvote/";
      service
        .request({
          method: UpVoted ? "delete" : "put",
          url: endpoint + item.item.id,
        })
        .then((res) => {
          console.log("Message: " + res.data.message);
          setUpVoted(!UpVoted);
          if (downVoted === true) setDownVoted(!downVoted);
          setVotes(UpVoted ? votes - 1 : votes + 1);
        })
        .catch((error) => {
          console.log("Network failed", error);
        });
    } else {
      showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
    }
  };

  const downVote = () => {
    if (isLogin) {
      const endpoint = downVoted ? "/unvote/" : "/downvote/";
      service
        .request({
          method: downVoted ? "delete" : "put",
          url: endpoint + item.item.id,
        })
        .then((res) => {
          console.log("Message: " + res.data.message);
          setDownVoted(!downVoted);
          if (UpVoted === true) setUpVoted(!UpVoted);
          setVotes(downVoted ? votes + 1 : votes - 1);
        })
        .catch((error) => {
          console.log("Network failed", error);
        });
    } else {
      showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
    }
  };

  return (
    <View style = {{
      backgroundColor:'white',
      marginBottom:10,
      marginLeft:10,
      marginRight:10,
      borderRadius:10,
      borderColor:"gray",
      borderWidth:1
      }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: item.item.authorAvatar,
            }}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>
        <View>
          <Text style={styles.Name}>{item.item.author}</Text>
          <Text style={styles.Time}>{item.item.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.topicName}>{item.item.name}</Text>
      <Text style={styles.Decript}>{item.item.content}</Text>
      {item.item.images.length > 0 && (
        <ImageSlider2
          data={item.item.images.map((img) => ({
            img,
          }))}
          caroselImageContainerStyle={styles.caroselImageContainerStyle}
          activeIndicatorStyle={styles.activeIndicatorStyle}
          indicatorContainerStyle={styles.indicatorContainerStyle}
          preview={false}
        />)}

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
              marginTop:10
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
                onPress={upVote}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: "#52575D",
              }}
            >
              {votes}
            </Text>
            <TouchableOpacity>
              <Ionicons
                name={downVoted ? "arrow-down-outline" : "arrow-down-outline"}
                size={30}
                color={downVoted ? "#AACCFF" : "#52575D"}
                style={{
                  marginLeft: 5,
                }}
                onPress={downVote}
              />
            </TouchableOpacity>
          </View>
          <Ionicons
            name="chatbubble-outline"
            size={27}
            color="#52575D"
            style={styles.iconStyle}
            onPress={() =>
              navigation.navigate("Comment", {
                topicId: item.item.id,
                comments: item.item.comments,
              })
            }
          ></Ionicons>

          <Ionicons
            name={saveTopic ? "flag" : "flag-outline"}
            size={27}
            color={saveTopic ? "#AACCFF" : "#52575D"}
            style={styles.iconStyle}
            onPress={handleSaveTopicPress}
          ></Ionicons>
        </View>
      </View>
      {/* <View style={styles.Rectangle} /> */}
    </View>
  );
};

export default memo(Topic);

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const standarWidth = 360;
const standardHeight = 800;

const postHeight = screenHeight * 0.5;
const postWidth = screenWidth;

const styles = StyleSheet.create({
  body: {
    height: screenHeight * 0.81,
    borderRadius: 20, // Add this to round the corners
    marginBottom: 10, // Add this for spacing between topics
    overflow: "hidden", // Add this to ensure the rounded corners are applied
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
    backgroundColor: "#C0D8FC",
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
    fontSize: 20,
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
  
  indicatorContainerStyle: {
    position: "absolute",
    bottom: -10,
  },
});
