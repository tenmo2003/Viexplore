import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Text, Avatar } from "react-native-elements";
import service from "../helper/axiosService";
import { showAlert } from "../helper/CustomAlert";
import { MaterialIcons } from "react-native-vector-icons";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function TopicListScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [haveResults, setHaveResults] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const isEndReached = useRef(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const maximumAmountOfSearchResults = 10;
    // const results =
    //   .slice(0, maximumAmountOfSearchResults);
    // setSearchResults(results);
    // setHaveResults(results.length !== 0);
  }, [query]);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (pageNumber) => {
    if (loading || isEndReached.current) return;

    try {
      setLoading(true);

      const index = (pageNumber - 1) * perPage;
      const offset = perPage;

      service
        .get(`/topics?index=${index}&offset=${offset}`)
        .then((res) => {
          if (res.data.status === 200) {
            const newData = res.data.results;

            if (newData.length > 0) {
              setData([...data, ...newData]);
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
    <View style={[styles.showList]}>
      <Avatar
        style={styles.imagesPost}
        source={
          item.item.images[0] ? { uri: item.item.images[0] } : require("./../../assets/ava.png")
        }
      />
      <FontAwesome style={styles.iconEdit} name="pencil-square-o" size={24} color="black" />
      <Text style={styles.informationUser}>
        {item.item.author}
      </Text>
      <Text style={styles.contentPost}>
        {item.item.content}
      </Text>
      <Text style={styles.vote}>
        {"Lượt thích: "}{item.item.votes}
      </Text>
      <Text style={styles.time}>
        {item.item.createdAt}
      </Text>
    </View>
  );

  const backToAdminHome = () => {
    navigation.navigate("Admin");
  };

  const handleEndReached = () => {
    fetchData(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToAdminHome}>
          <Feather
            name="chevron-left"
            size={30}
            color="#3F3F3F"
            style={{
              position: "absolute",
              left: 15,
              top: Platform.OS === "ios" ? 60 : 20,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.TextAdmin}>Bài đăng</Text>
        <View
          style={
            haveResults && showResults
              ? styles.searchContainer
              : styles.searchContainerEmpty
          }
        >
          <View style={styles.searchInner}>
            <Feather
              name="search"
              size={24}
              color="black"
              position="absolute"
              left={iconSearchBarPos}
            />
            <TextInput
              placeholder="Tìm kiếm bài đăng"
              style={styles.input}
              value={query}
              onChangeText={(value) => {
                setQuery(value);
                setShowResults(true);
              }}
              onFocus={() => {
                setShowResults(true);
              }}
              onBlur={() => {
                setShowResults(false);
              }}
            />
            {/* {query.length > 0 && ( */}
            <TouchableOpacity
              onPress={() => setQuery("")}
              style={{ position: "absolute", right: iconSearchBarPos - 10 }}
            >
              {query.length > 0 && (
                <MaterialIcons
                  name="clear"
                  size={26}
                  color="rgba(127, 127, 127, 0.5)"
                />
              )}
            </TouchableOpacity>
            {/* )} */}
          </View>
          {/* {showResults && (
            <View style={styles.dropDown}>
              {searchResults.map((location, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onSearch(location);
                    setShowResults(false);
                    Keyboard.dismiss();
                  }}
                  style={styles.dropDownRow}
                  key={index}
                >
                  <Text>{location.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )} */}
        </View>
      </View>
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
  );
}

const { height, width } = Dimensions.get("window");

const searchBarPosANDR = height / 12;
const searchBarPosIOS = 110;
const iconSearchBarPos = height / 40;

const searchBarWidth = "95%";
const dropDownWidth = searchBarWidth * 0.85;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: Platform.OS === "ios" ? height / 5 : height / 6.5,
    backgroundColor: "#AACCFF",
    selfItems: "flex-start",
  },
  body: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  TextAdmin: {
    top: Platform.OS === "ios" ? 55 : 15,
    fontSize: 30,
    color: "#000",
    alignSelf: "center",
  },
  search: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 80,
    alignSelf: "center",
    width: "95%",
  },
  col: {
    flexDirection: "column",
  },
  row: {
    top: 10,
    flexDirection: "row",
    alignSelf: "center",
    flexWrap: "wrap",
  },
  cell: {
    width: width / 3 - width / 18,
    height: width / 3 - width / 18,
    margin: width / 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#959595",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainerEmpty: {
    position: "absolute",
    top: Platform.OS === "ios" ? searchBarPosIOS : searchBarPosANDR,
    backgroundColor: "white",
    width: searchBarWidth,
    borderRadius: 35,
    display: "flex",
    height: 50,
    borderColor: "#BABABA",
    alignSelf: "center",
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? searchBarPosIOS : searchBarPosANDR,
    backgroundColor: "white",
    width: searchBarWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#BABABA",
    alignSelf: "center",
  },
  dropDown: {
    position: "absolute",
    top: 40,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: searchBarWidth,
    display: "flex",
    flexDirection: "column",
  },
  dropDownempty: {
    borderWidth: 0,
  },
  dropDownRow: {
    cursor: "pointer",
    padding: 10,
    alignItems: "flex-start",
  },
  input: {
    paddingLeft: 40,
    width: searchBarWidth,
    fontSize: 18,
  },
  searchInner: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  showList: {
    height: 200,
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#D9D9D9",
  },
  iconEdit: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  informationUser: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "600",
    left: 35,
    top: 10,
  },
  imagesPost: {
    position: "absolute",
    right: 0,
    width: 250,
    height: 195,
  },
  contentPost: {
    position: "absolute",
    width: 150,
    height: 150,
    fontSize: 18,
    left: 10,
    top: 35,
  },
  vote: {
    position: "absolute",
    fontSize: 12,
    left: 10,
    bottom: 15,
  },
  time: {
    position: "absolute",
    fontSize: 12,
    left: 10,
    bottom: 2,
    color: "#888888",
  }
};
