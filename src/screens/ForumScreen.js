import React, {useState, useEffect, useRef} from "react";
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
} from "react-native";
import { Input, Button, Slider } from "react-native-elements";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "react-native-vector-icons";
import Loading from "../components/Loading";
import service from "../helper/axiosService";
import { useFocusEffect } from "@react-navigation/native";

function ForumScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [resetPage, setResetPage] = useState(0);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const isEndReached = useRef(false);

  useEffect(() => {
    const maximumAmountOfSearchResults = 10;
  }, [query]);

  useEffect(() => {
    fetchData(page);
  }, [resetPage]);

  useFocusEffect(
    React.useCallback(() => {
      handleResetPage();
    }, [])
  );

  const fetchData = async (pageNumber) => {
    if (loading || isEndReached.current) return;

    try {
      setLoading(true);

      const index = (pageNumber - 1) * perPage;
      const offset = perPage;

      service
        .get(`/topics?index=${index}&offset=${offset}`)
        .then((res) => {
          console.log(res.data.results)
          if (res.data.status === 200) {
            const newData = res.data.results;

            if (newData.length > 0) {
              const reversedData = [...newData].reverse();
              setData([...reversedData, ...data]);
              setPage(pageNumber + 1);
            } else {
              isEndReached.current = true;
            }
          } else {
            console.error("API request failed:", res.data.message);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.profileImage}>
          <Image
            source={item.item.authorAvatar ? item.item.authorAvatar : require("./../../assets/ava.png")}
            style={styles.image}
            resizeMode="center"
          ></Image>
        </View>
        <View>
          <Text style={styles.Name}>{item.item.author}</Text>
          <Text style={styles.Time}>{item.item.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.Decript}>{item.item.content}</Text>
      <ImageSlider
        data={item.item.images.map((img) => ({ img }))}
        caroselImageContainerStyle={styles.caroselImageContainerStyle}
        activeIndicatorStyle={styles.activeIndicatorStyle}
        indicatorContainerStyle={styles.indicatorContainerStyle}
        preview={false}
      />

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
                name="arrow-up-outline"
                size={30}
                color="#52575D"
                style={{
                  marginRight: 5,
                }}
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
                name="arrow-down-outline"
                size={30}
                color="#52575D"
                style={{
                  marginLeft: 5,
                }}
              />
            </TouchableOpacity>
          </View>
          <Ionicons
            name="chatbubble-outline"
            size={27}
            color="#52575D"
            style={styles.iconStyle}
            onPress={() => navigation.navigate("Comment")}
          ></Ionicons>
          <Ionicons
            name="flag-outline"
            size={27}
            color="#52575D"
            style={styles.iconStyle}
          ></Ionicons>
        </View>
      </View>
      <View style={styles.Rectangle} />
    </View>
  );

  const handleEndReached = () => {
    fetchData(page);
  };

  const handleResetPage = () => {
    setResetPage((prev) => prev + 1);
  };

  return (
    <View>
      {loading && <Loading full={true} />}
    <View style={Platform.OS === "ios" && { paddingTop: 30 }}>
      <View style={{ flexDirection: "row", marginBottom: 15}}>
        <View style={styles.profileImage}>
          <Image
            source={require("./../../assets/cho.jpg")}
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
      <View style={styles.Rectangle} />

      {/* Code for ở đây */}
      <View style={styles.body}> 
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
        />
        {loading && <ActivityIndicator />}
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
    height: screenHeight*0.81,
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
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 16,
    marginRight: 20,
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
    marginLeft: (75/standarWidth)*screenWidth,
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
