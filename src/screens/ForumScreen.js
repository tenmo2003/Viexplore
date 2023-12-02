import React, { useState, useEffect, useRef, useContext } from "react";
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
} from "react-native";
import { Input, Button, Slider } from "react-native-elements";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "react-native-vector-icons";
import Loading from "../components/Loading";
import service from "../helper/axiosService";
import { useFocusEffect } from "@react-navigation/native";
import TokenContext from "../contexts/TokenContext";
import { showAlert } from "../helper/CustomAlert";
import Topic from "../components/Topic";

function ForumScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useContext(TokenContext);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const isEndReached = useRef(false);

  useEffect(() => {
    token ? setIsLogin(true) : setIsLogin(false);
  }, [token]);

  const fetchData = async (pageNumber) => {
    if (loading || isEndReached.current) return;

    try {
      setLoading(true);

      const index = (pageNumber - 1) * perPage;
      const offset = perPage;

      service.get(`/topics?index=${index}&offset=${offset}`).then((res) => {
        if (res.data.status === 200) {
          const newData = res.data.results;

          if (newData.length > 0) {
            //const reversedData = [...newData].reverse();
            setData([...data, ...newData]);
            setPage(pageNumber + 1);
          } 
          if (newData.length < offset) {
            isEndReached.current = true;
          }
          setLoading(false);
        } else {
          console.error("API request failed:", res.data.message);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    setLoading(true);
    service.get("/users/me", {}).then(
      (res) => {
        setAvatar(res.data.results.avatar);
        setLoading(false);
      },
      () => {
        console.log("failed");
      }
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      isEndReached.current = false;
      setData([]);
      setPage(1);
      //fetchData(1);
    }, [])
  );

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const renderItem = ({item, index}) => <Topic item={item} navigation={navigation} data={data} setData={setData} />;

  const handleEndReached = () => {
    fetchData(page);
  };

  return (
    <View className="flex-1" style ={{backgroundColor:"#C0D8FC"}}>
      <View
        style={Platform.OS === "ios" && { paddingTop: 30 }}
        className="flex-1"
      >
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={styles.profileImage}>
            <Image
              source={ avatar ? {uri: avatar} : require("./../../assets/ava.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
            <View style={styles.inputContainer}>
              <Button
                title="Hãy thêm kỷ niệm đẹp...."
                iconRight
                icon={{
                  type: "font-awesome",
                  name: "image",
                  color: "#BABABA",
                }}
                buttonStyle={styles.inputContainerStyle}
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate("CreatePost")}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.Rectangle} /> */}

        {/* Code for ở đây */}
        <View className="flex-1" >
          {data.length > 0 && (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.6}
              windowSize={10}
              showsVerticalScrollIndicator={false}
            />
          )}
          {loading && <ActivityIndicator color="black" size="large" />}
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
  body: {
    flex: 1,
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
  // Rectangle: {
  //   width: Dimensions.get("window").width,
  //   height: 10,
  //   backgroundColor: "#AEB5BC",
  // },
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

export default ForumScreen;
