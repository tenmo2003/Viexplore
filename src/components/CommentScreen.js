import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import Loading from "./Loading";
import service from "../helper/axiosService";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function CommentScreen({ route, navigation }) {
  const { topicId, comments, username } = route.params;

  const [checkAuthor, setCheckAuthor] = useState(false);
  const handleSendPress = () => {
    onSubmit();
  };

  useEffect(() => {
    setLoading(true);
    service.get("/comments/" + topicId).then((res) => {
      setLoading(false);
      setReversedComments(res.data.results.reverse());
    });

    const interval = setInterval(() => {
      service.get("/comments/" + topicId).then((res) => {
        setReversedComments(res.data.results.reverse());
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
          setImage(result.assets[0]);
          console.log(result.assets[0]);
        }
      }
    } catch (error) {
      console.log("No image was picked");
    }
  };

  const [editedImage, setEditedImage] = useState(null);

  const editPickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
          setEditedImage(result.assets[0]);
          console.log(result.assets[0]);
        }
      }
    } catch (error) {
      console.log("No image was picked");
    }
  };

  //bỏ chọn ảnh
  const handleDeleteImage = () => {
    setImage(null);
  };

  useEffect(() => {}, [topicId, comments]);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    console.log(topicId);
    console.log(content);
    console.log(image);

    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("content", content);
    
    for (let i = 0; i < image.length; i++) {
      formData.append("image", {
        uri:
          Platform.OS === "android"
            ? image[i].uri
            : image[i].uri.replace("file://", "/private"),
        name: "image.jpg",
        type: "image/jpg",
      });
    }

    setLoading(true);
    service
      .post("/comment", formData)
      .then((res) => {
        console.log("Message: " + res.data.message);
        setLoading(false);
        if (res.data.status === 201) {
          setReversedComments([
            {
              id: res.data.results.id,
              content: res.data.results.content,
              commenter: res.data.results.commenter,
              createdAt: res.data.results.createdAt,
              image: res.data.results.image,
            },
            ...reversedComments,
          ]);
          setContent("");
          setImage([]);
          //console.log("Content: " + res.data.content);
        }
      })
      .catch((error) => {
        console.log("Network failed", error);
        setLoading(false);
      });
  };

  const onChangeContent = (input) => {
    setContent(input);
  };

  //Edit, delete comment
  const [reversedComments, setReversedComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const deleteComment = (commentId) => {
    setLoading(true);
    service
      .delete("/comment/" + commentId)
      .then((res) => {
        setReversedComments(
          reversedComments.filter((el) => el.id !== commentId)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Delete Failed:", error);
        setLoading(false);
      });
  };

  const editComment = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", editingCommentId);
    formData.append("content", editedContent);
    formData.append("image", {
      uri:
        Platform.OS === "android"
          ? editedImage.uri
          : editedImage.uri.replace("file://", "/private"),
      name: "image.jpg",
      type: "image/jpg",
    });
    service
      .put("/comment", formData)
      .then((res) => {
        setReversedComments(
          reversedComments.map((el) =>
            el.id === editingCommentId ? { ...el, content: editedContent } : el
          )
        );
        setEditingCommentId(null);
        setEditedContent("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Edit Failed:", error);
        setLoading(false);
      });
  };

  const onCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent("");
    setEditedImage(null);
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <View style={styles.profileImage}>
          <Image
            source={{ uri: item.commenter.avatar }}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>
        <View>
          {editingCommentId === item.id ? (
            <View style={styles.commentInput}>
              <View
                style={{ ...styles.inputContainer2, width: screenWidth - 95 }}
              >
                <Input
                  placeholder="Chỉnh sửa bình luận..."
                  inputContainerStyle={styles.inputContainerStyle2}
                  inputStyle={styles.inputStyle2}
                  value={editedContent}
                  onChangeText={(text) => setEditedContent(text)}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "#D9D9D9",
                marginLeft: 15,
                borderRadius: 20,
                flexWrap: "wrap",
              }}
            >
              <Text style={styles.Name}>{item.commenter.username}</Text>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  flexWrap: "wrap",
                  maxWidth: screenWidth - 95,
                }}
              >
                {item.content}
              </Text>
            </View>
          )}

          {item.image && (
            <TouchableOpacity onPress={editPickImage}>
              <Image
                source={{
                  uri:
                    editingCommentId === item.id && editedImage !== null
                      ? editedImage.uri
                      : item.image,
                }}
                style={styles.cmtImg}
              />
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.Time}>{item.createdAt}</Text>
            {editingCommentId !== item.id ? (
              <>
                <TouchableOpacity
                  style={styles.Time}
                  onPress={() => {
                    if (item.username === username || username === "admin") {
                      setEditedContent(item.content); // Cập nhật editedContent với nội dung của comment ban đầu
                      setEditingCommentId(item.id);
                    }
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color:
                        item.username === username || username === "admin"
                          ? "black"
                          : "#D9D9D9",
                    }}
                  >
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Time}
                  onPress={() =>
                    (item.username === username || username === "admin") &&
                    deleteComment(item.id)
                  }
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color:
                        item.username === username || username === "admin"
                          ? "black"
                          : "#D9D9D9",
                    }}
                  >
                    Xoá
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.Time} onPress={editComment}>
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Lưu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Time}
                  onPress={() => onCancelEdit()}
                >
                  <Text style={{ fontWeight: "bold", color: "red" }}>Hủy</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {loading && <Loading />}
      <View style={styles.sheetScreen}>
        <View style={{ height: screenHeight - screenHeight * 0.3 }}>
          <FlatList
            data={reversedComments}
            keyExtractor={(reversedComments) => reversedComments.id.toString()}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.commentInput}>
          <View style={styles.inputContainer2}>
            <Input
              placeholder="Bình luận của bạn..."
              leftIcon={{
                type: "font-awesome",
                name: "user",
                color: "#BABABA",
              }}
              rightIcon={{
                type: "font-awesome",
                name: "send",
                color: "#BABABA",
                size: 20,
                onPress: handleSendPress,
              }}
              inputContainerStyle={styles.inputContainerStyle2}
              inputStyle={styles.inputStyle2}
              leftIconContainerStyle={styles.leftIconStyle}
              rightIconContainerStyle={styles.rightIconStyle}
              value={content}
              onChangeText={(value) => onChangeContent(value)}
              onSubmitEditing={handleSendPress}
            />
            <View style={{ alignItems: "flex-end" }}>
              <Ionicons
                name="image-outline"
                size={27}
                color="#52575D"
                style={styles.cmtIcon}
                onPress={pickImage}
              ></Ionicons>
            </View>
          </View>

          {image && (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ marginLeft: 5, marginBottom: 5 }}>
                <Image source={{ uri: image.uri }} style={styles.postimg} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => handleDeleteImage()}
                >
                  <Ionicons
                    name="close-outline"
                    size={18}
                    color="white"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
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
  postimg: {
    width: (100 / standarWidth) * screenWidth,
    height: (100 / standarWidth) * screenWidth,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  profileImage: {
    marginLeft: (10 / standarWidth) * screenWidth,
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
    marginTop: 2,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
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

    fontSize: screenWidth / 25,
  },

  sheetScreen: {
    backgroundColor: "#fff",
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "gray",
    borderRadius: 100,
    padding: 3,
  },

  commentInput: {
    backgroundColor: "white",
  },
  inputContainer2: {
    width: screenWidth - 70,
    flexDirection: "row",
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
    marginLeft: 5,
  },
  cmtImg: {
    width: 100,
    height: 100,
    marginLeft: 15,
    borderRadius: 7,
    marginTop: 5,
  },
});

export default CommentScreen;
