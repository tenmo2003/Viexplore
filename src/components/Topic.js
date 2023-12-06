import React, { useState, useEffect, useRef, useContext, memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import ImageSlider2 from "./ImageSlide2";
import { Ionicons } from "react-native-vector-icons";
import TokenContext from "../contexts/TokenContext";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import Loading from "../components/Loading";
import Modal from "react-native-modal";
import { Feather } from "react-native-vector-icons";
import CommentScreen from "./CommentScreen";

const Topic = ({ item, navigation, data, setData }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useContext(TokenContext);
  const [saveTopic, setSaveTopic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voteValue, setVoteValue] = useState(0);
  const [votes, setVotes] = useState(item.votes);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [checkAuthor, setCheckAuthor] = useState(false);

  const [authorAvatar, setAuthorAvatar] = useState("");

  const [topicName, setTopicName] = useState(item.name);
  const [topicContent, setTopicContent] = useState(item.content);

  useEffect(() => {
    token ? setIsLogin(true) : setIsLogin(false);

    service.get("/users/" + item.author).then((res) => {
      setAuthorAvatar(res.data.results.avatar);
    });

    if (token) {
      service.get("/users/me", {}).then(
        (res) => {
          const savedTopics = res.data.results.savedTopics;
          setUsername(res.data.results.username);
          setRole(res.data.results.role);
          if (res.data.results.username === item.author) setCheckAuthor(true);
          for (let i = 0; i < savedTopics.length; i++) {
            if (savedTopics[i] === null) continue;
            if (savedTopics[i].id === item.id) setSaveTopic(!saveTopic);
          }

          const votedList = item.votesList;
          for (let i = 0; i < votedList.length; i++) {
            if (votedList[i] === null) continue;
            if (votedList[i].username === res.data.results.username) {
              setVoteValue(votedList[i].value);
            }
          }
          // console.log("topic: " + item.name + "- vote value:" + voteValue);

          setLoading(false);
        },
        () => {
          setLoading(false);
          console.log("failed to load savedTopic list");
        }
      );
    }
  }, []);

  const handleSaveTopicPress = () => {
    setLoading(true);
    if (isLogin) {
      if (saveTopic) {
        setSaveTopic(false);
        service
          .delete("/unsave-topic/" + item.id)
          .then((res) => {
            setLoading(false);
          })
          .catch((error) => {
            setSaveTopic(true);
            console.error("Delete Failed:", error);
          });
      } else {
        setSaveTopic(true);
        service
          .post("/save-topic/" + item.id)
          .then((res) => {
            setLoading(false);
          })
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
      const endpoint = voteValue === 1 ? "/unvote/" : "/upvote/";
      service
        .request({
          method: voteValue === 1 ? "delete" : "put",
          url: endpoint + item.id,
        })
        .then((res) => {
          console.log("Message: " + res.data.message);
          setVotes(
            voteValue === 1
              ? votes - 1
              : voteValue === -1
              ? votes + 2
              : votes + 1
          );
          setVoteValue(voteValue === 1 ? 0 : 1);
          // if (downVoted) setDownVoted(!downVoted);
          // setVotes(UpVoted ? votes - 1 : votes + 1);
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
      const endpoint = voteValue === -1 ? "/unvote/" : "/downvote/";
      service
        .request({
          method: voteValue === -1 ? "delete" : "put",
          url: endpoint + item.id,
        })
        .then((res) => {
          console.log("Message: " + res.data.message);
          setVotes(
            voteValue === -1
              ? votes + 1
              : voteValue === 1
              ? votes - 2
              : votes - 1
          );
          setVoteValue(voteValue === -1 ? 0 : -1);
          // if (UpVoted) setUpVoted(!UpVoted);
          // setVotes(downVoted ? votes + 1 : votes - 1);
        })
        .catch((error) => {
          console.log("Network failed", error);
        });
    } else {
      showAlert("Bạn cần đăng nhập để thực hiện chức năng này!");
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    console.log("tongling modal");
    setModalVisible(!isModalVisible);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const deleteTopic = () => {
    setLoading(true);
    service
      .delete("/topic/" + item.id)
      .then((res) => {
        console.log(res.data.message);
        setData(data.filter((el) => el.id !== item.id));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Delete Failed:", error);
        setLoading(false);
      });
  };

  //Edit Topic
  const [newName, setNewName] = useState(item.name);
  const [newContent, setNewContent] = useState(item.content);

  const onChangeNewName = (text) => {
    setNewName(text);
  };

  const onChangeNewContent = (text) => {
    setNewContent(text);
  };

  const onSubmit = () => {
    setLoading(true);

    service
      .put("/topic", {
        id: item.id,
        name: newName,
        content: newContent,
        author: item.author,
      })
      .then((res) => {
        console.log(res.data.message);
        setLoading(false);
        setModalVisible2(false);
        setTopicName(newName);
        setTopicContent(newContent);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //Comment
  const [isModalVisible3, setModalVisible3] = useState(false);
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
      }
    );
  
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  

  return (
    <>
      {loading && <Loading />}
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
          borderColor: "gray",
          borderWidth: 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("OtherUser", {
                username: item.author,
                avatar: authorAvatar,
              });
            }}
          >
            <View style={styles.profileImage}>
              <Image
                source={
                  authorAvatar !== ""
                    ? {
                        uri: authorAvatar,
                      }
                    : require("./../../assets/ava.png")
                }
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            <View>
              <Text style={styles.Name}>{item.author}</Text>
              <Text style={styles.Time}>{item.createdAt}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingRight: 5 }}>
            <Ionicons
              name={
                checkAuthor || role === "ROLE_ADMIN"
                  ? "ellipsis-vertical"
                  : "ellipsis-vertical"
              }
              color={checkAuthor || role === "ROLE_ADMIN" ? "black" : "#D9D9D9"}
              size={30}
              onPress={() =>
                (checkAuthor || role === "ROLE_ADMIN") && setModalVisible(true)
              }
              style={{ marginTop: 15 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.topicName}>{topicName}</Text>
        <Text style={styles.Decript}>{topicContent}</Text>
        {item.images.length > 0 && (
          <ImageSlider2
            data={item.images.map((img) => ({
              img,
            }))}
            caroselImageContainerStyle={styles.caroselImageContainerStyle}
            activeIndicatorStyle={styles.activeIndicatorStyle}
            indicatorContainerStyle={styles.indicatorContainerStyle}
            preview={false}
          />
        )}

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
                marginTop: 10,
              }}
            >
              <TouchableOpacity>
                <Ionicons
                  name={
                    voteValue === 1 ? "arrow-up-outline" : "arrow-up-outline"
                  }
                  size={30}
                  color={voteValue === 1 ? "#AACCFF" : "#52575D"}
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
                  name={
                    voteValue === -1
                      ? "arrow-down-outline"
                      : "arrow-down-outline"
                  }
                  size={30}
                  color={voteValue === -1 ? "#AACCFF" : "#52575D"}
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
              onPress={
                () => setModalVisible3(true)
                // navigation.navigate("Comment", {
                //   topicId: item.id,
                //   comments: item.comments,
                // })
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

        <Modal
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          swipeDirection="down"
          onSwipeComplete={toggleModal}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={600}
          animationOutTiming={300}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={300}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
            </View>

            <View style={styles.flexColumn}>
              <View style={styles.editTopic}>
                <TouchableOpacity
                  style={styles.flexEdit}
                  onPress={() => {
                    setModalVisible2(true);
                    setModalVisible(false);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        paddingHorizontal: 10,
                      }}
                    >
                      Sửa bài viết
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    style={{
                      alignSelf: "flex-end",
                    }}
                    size={30}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.delete}>
                <TouchableOpacity style={styles.flexEdit} onPress={deleteTopic}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        paddingHorizontal: 10,
                      }}
                    >
                      Xoá
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    style={{
                      alignSelf: "flex-end",
                    }}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => setModalVisible2(false)}
          onBackButtonPress={() => setModalVisible2(false)}
          isVisible={isModalVisible2}
          swipeDirection="down"
          onSwipeComplete={toggleModal2}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={600}
          animationOutTiming={300}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={300}
          style={styles.modal}
        >
          <View
            style={{ ...styles.modalContent, minHeight: screenHeight / 1.7 }}
          >
            <View style={{ ...styles.barIcon, marginBottom: 20 }} />

            <View style={styles.center}>
              <View
                style={{
                  ...styles.postContent,
                  marginBottom: 10,
                  height: postHeight * 0.15,
                }}
              >
                <TextInput
                  placeholder="Tiêu đề:"
                  style={styles.textPost}
                  value={newName}
                  onChangeText={(text) => onChangeNewName(text)}
                />
              </View>
              <View style={{ ...styles.postContent, marginBottom: 10 }}>
                <TextInput
                  multiline={true}
                  maxLength={400}
                  style={styles.textPost}
                  placeholder="Hãy thêm kỷ niệm đẹp...."
                  value={newContent}
                  onChangeText={(text) => onChangeNewContent(text)}
                ></TextInput>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onSubmit()}
                >
                  <Text style={styles.buttonText}>Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => setModalVisible3(false)}
          onBackButtonPress={() => setModalVisible3(false)}
          isVisible={isModalVisible3}
          onSwipeComplete={toggleModal3}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={600}
          animationOutTiming={300}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={300}
          style={styles.modal}
        >
          <View style={{ ...styles.commentModal, minHeight: screenHeight - keyboardHeight}}>
            {/* Gọi comment */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 15,
                paddingLeft: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity>
                <Icon
                  name="chevron-left"
                  type="font-awesome"
                  color="#000"
                  size={24}
                  onPress={() => setModalVisible3(false)}
                />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 18, alignItems: "center", paddingLeft: 15 }}
              >
                {" "}
                Bình luận{" "}
              </Text>
              <TouchableOpacity>
                <Ionicons
                  name={saveTopic ? "flag" : "flag-outline"}
                  size={27}
                  color={saveTopic ? "#AACCFF" : "#52575D"}
                  onPress={handleSaveTopicPress}
                ></Ionicons>
              </TouchableOpacity>
            </View>
            
            <CommentScreen
              route={{
                params: {
                  topicId: item.id,
                  comments: item.comments,
                  username: username,
                },
              }}
              navigation={navigation}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

export default memo(Topic);

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const standarWidth = 360;
const standardHeight = 800;

const settingsHeight = screenHeight / 4;
const settingsWidth = screenWidth / 12;
const paddingTopModalContent = 10;

const postHeight = screenHeight * 0.5;
const postWidth = screenWidth;

const styles = StyleSheet.create({
  body: {
    height: screenHeight * 0.81,
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
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

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: paddingTopModalContent,
    paddingHorizontal: settingsWidth,
    borderWidth: 5,
    borderColor: "#000",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    minHeight: settingsHeight,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  commentModal: {
    backgroundColor: "#fff",
    paddingTop: paddingTopModalContent,
    borderWidth: 5,
    borderColor: "#000",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: settingsHeight - paddingTopModalContent * 2,
  },
  delete: {
    top: 60,
    height: "auto",
  },
  flexEdit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editTopic: {
    top: 30,
    height: "auto",
  },
  postContent: {
    borderWidth: 3,
    height: postHeight * 0.65,
    alignItems: "center",
    width: postWidth * 0.85,
    borderColor: "#000",
    borderRadius: 20,
  },
  textPost: {
    marginVertical: Platform.OS === "ios" ? 10 : -5,
    padding: 15,
    borderColor: "#000",
    maxHeight: postHeight * 0.6,
    width: postWidth * 0.82,
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
});