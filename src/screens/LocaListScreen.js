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
import { Feather, Ionicons } from "@expo/vector-icons";

export default function LocaListScreen({ navigation }) {
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
        .get(`/admin/locations?index=${index}&offset=${offset}`)
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
        source={
          item.item.thumbnail
            ? { uri: item.item.thumbnail }
            : require("./../../assets/ava.png")
        }
        rounded
        size={80}
      />
      <Ionicons
        style={styles.locationIcon}
        name="location-sharp"
        size={24}
        color="red"
      />
      <Text style={styles.informationLoca}>
        {item.item.name
          ? item.item.name.length <= 20
            ? item.item.name
            : item.item.name.substring(0, 20) + "..."
          : "Unknown"}{" "}
        {"\u00B7"} {item.item.generalLocation}
      </Text>
      <Text style={styles.script}>
        {item.item.script
          ? item.item.script.substring(0, item.item.script.lastIndexOf(" ", 80)) + "..."
          : "No description"}
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
      {loading && <Loading full={false} />}
      <View style={styles.header}>
        <TouchableOpacity onPress={backToAdminHome}>
          <Feather
            name="chevron-left"
            size={30}
            color="#3F3F3F"
            style={{
              position: "absolute",
              left: 15,
              top: Platform.OS === "ios" ? 60 : 35,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.TextAdmin}>Di tích</Text>
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
              placeholder="Tìm kiếm di tích"
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

const searchBarPosANDR = height / 25;
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
    height: Platform.OS === "ios" ? height / 5 : height / 5 - 20,
    backgroundColor: "#AACCFF",
    selfItems: "flex-start",
  },
  body: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  TextAdmin: {
    top: Platform.OS === "ios" ? 55 : 30,
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
    height: 100,
    padding: 10,
    paddingLeft: width / 26,
    borderBottomWidth: 1,
    borderBottomColor: "#888888",
  },
  locationIcon: {
    position: "absolute",
    left: width / 4,
    top: 6,
  },
  informationLoca: {
    position: "absolute",
    fontSize: 16,
    left: width / 3.2,
    top: 10,
  },
  script: {
    position: "absolute",
    width: width - width / 3.5,
    fontSize: 16,
    left: width / 3.8,
    top: 35,
  },
};
