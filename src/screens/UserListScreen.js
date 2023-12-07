import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { MaterialIcons } from "react-native-vector-icons";
import { actionAlert, showAlert } from "../helper/CustomAlert";
import service from "../helper/axiosService";

export default function UserListScreen({ navigation, route }) {
  const [query, setQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const isEndReached = useRef(false);

  const [isBanned, setIsBanned] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const restoreIsBanned = async () => {
      try {
        const savedIsBanned = await AsyncStorage.getItem("isBanned");
        if (savedIsBanned) {
          setIsBanned(JSON.parse(savedIsBanned));
        }
      } catch (error) {
        console.error("Error restoring isBanned from AsyncStorage:", error);
      }
    };

    restoreIsBanned();
  }, []);

  const toggleBanStatus = (index) => {
    const updatedIsBanned = [...isBanned];
    updatedIsBanned[index] = !updatedIsBanned[index];
    setIsBanned(updatedIsBanned);

    // Save the updated isBanned array to AsyncStorage
    AsyncStorage.setItem("isBanned", JSON.stringify(updatedIsBanned));
  };

  useEffect(() => {
    // Fetch or filter data for search suggestions based on the query
    const results = data.filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );

    setSearchSuggestions(results);
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
        .get(`/admin/users?index=${index}&offset=${offset}`)
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const banUser = (index) => {
    setLoading(true);
    service.put(`/admin/ban-user?username=` + `${data[index].username}`).then(
      (res) => {
        setLoading(false);
        if (res.status === 200) {
          toggleBanStatus(index);
          console.log("Ban người dùng thành công");
          showAlert("Ban người dùng thành công", false, "UserList");
        }
      },
      () => {
        console.log("Network failed");
        setLoading(false);
      }
    );
  };

  const unBanUser = (index) => {
    setLoading(true);
    service.put(`/admin/unban-user?username=` + `${data[index].username}`).then(
      (res) => {
        setLoading(false);
        if (res.status === 200) {
          toggleBanStatus(index);
          console.log("Gỡ Ban người dùng thành công");
          showAlert("Gỡ Ban người dùng thành công", false, "UserList");
        }
      },
      () => {
        console.log("Network failed");
        setLoading(false);
      }
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.showList]}>
      <Avatar
        source={
          item.avatar ? { uri: item.avatar } : require("./../../assets/ava.png")
        }
        rounded
        size={60}
      />
      <Text style={styles.informationUser}>
        {item.username}
        {"\n"}
        {item.fullName}
        {"\n"}
        {item.email}
      </Text>
      {isBanned[index] ? (
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => unBanUser(index)}
        >
          <MaterialIcons
            name="report-problem"
            size={30}
            color="#EBEBEB"
            opacity={0.8}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => {
            actionAlert("Bạn có chắc chắn muốn cấm người dùng này?", () => {
              banUser(index);
            })
          }}
        >
          <MaterialIcons
            name="report-problem"
            size={30}
            color="#EF2525"
            opacity={0.8}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const backToAdminHome = () => {
    navigation.navigate("Admin");
  };

  const handleEndOfUserReached = () => {
    fetchData(page);
  };

  const renderData = query.length > 0 ? searchSuggestions : data;

  return (
    <>
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
          <Text style={styles.TextAdmin}>Người dùng</Text>
          <View style={styles.searchContainerEmpty}>
            <View style={styles.searchInner}>
              <Feather
                name="search"
                size={24}
                color="black"
                position="absolute"
                left={iconSearchBarPos}
              />
              <TextInput
                placeholder="Tìm kiếm người dùng"
                style={styles.input}
                value={query}
                onChangeText={(value) => {
                  setQuery(value);
                  setShowResults(true);
                }}
                onFocus={() => {
                  setShowResults(true);
                  setIsSearchFocused(true);
                }}
                onBlur={() => {
                  setShowResults(false);
                  setIsSearchFocused(false);
                }}
              />
              {query.length > 0 && (
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
              )}
            </View>
          </View>
        </View>
        <View className="flex-1">
          {data.length > 0 && (
            <FlatList
              data={renderData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              onEndReached={handleEndOfUserReached}
              onEndReachedThreshold={0.8}
            />
          )}
          {loading && <ActivityIndicator color="black" size="large" />}
        </View>
      </View>
    </>
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
    height: 80,
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#888888",
  },
  informationUser: {
    position: "absolute",
    fontSize: 16,
    left: 90,
    top: 10,
  },
  reportButton: {
    position: "absolute",
    right: 20,
    top: 25,
  },
};
