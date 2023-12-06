import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import service from "../helper/axiosService";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import TimeAgo from "react-native-timeago";
import { Feather } from "@expo/vector-icons";

export default function ManagedReportScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  let moment = require("moment");
  require("moment/locale/vi");
  moment.locale("vi");

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    service
      .get("/admin/reports")
      .then((res) => {
        setNotifications(res.data.results.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let interval;
    if (isFocused) {
      interval = setInterval(() => {
        service
          .get("/admin/reports")
          .then((res) => {
            setNotifications(res.data.results.reverse());
            // console.log(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocused]);
  

  const backToAdminHome = () => {
    navigation.navigate("Admin");
  };

  return (
    <View className="flex-1 flex bg-white">
      {loading && <Loading />}
      <View className="flex flex-row">
        <TouchableOpacity onPress={backToAdminHome}>
          <Feather
            name="chevron-left"
            size={30}
            color="#3F3F3F"
            style={{
              left: 15,
              top: Platform.OS === "ios" ? 60 : 18,
            }}
          />
        </TouchableOpacity>
        <Text className="text-3xl font-bold mt-4 ml-5">Các góp ý</Text>
      </View>
      <ScrollView className="flex-1">
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => {
                notification.location && navigation.navigate("MapTab", {
                  screen: "Map",
                  params: {
                    id: notification.location.id,
                  },
                });
              }}
            >
              <View className="bg-slate-200 px-2 py-2 rounded-lg my-1 mx-3 flex flex-row items-center">
                <View>
                  <Image
                    source={
                      notification.type === "BROADCAST"
                        ? require("./../../assets/notificationBell.png")
                        : notification.location && notification.location.thumbnail
                        ? { uri: notification.location.thumbnail }
                        : require("./../../assets/notificationBell.png")
                    }
                    className="w-14 h-14 rounded-full"
                  />
                </View>
                <View className="ml-2 flex-1 flex">
                  <Text numberOfLines={2} className="text-base">
                    {notification.username ? notification.username : "Ai đó"}{" vừa góp ý về địa danh "}{notification.location ? (notification.location.name + " ") : ""}{"với nội dung: "}{notification.reason ? notification.reason : "Không rõ"}
                  </Text>
                  <TimeAgo time={notification.timestamp} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
