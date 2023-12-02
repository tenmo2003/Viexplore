import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import service from "../helper/axiosService";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import TimeAgo from "react-native-timeago";

export default function NotificationScreen() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  let moment = require("moment");
  require("moment/locale/vi");
  moment.locale("vi");

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    service
      .get("/notifications")
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
          .get("/notifications")
          .then((res) => {
            setNotifications(res.data.results.reverse());
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

  return (
    <View className="flex-1 flex bg-white">
      {loading && <Loading />}
      <Text className="text-3xl font-bold mt-3 ml-3">Notifications</Text>
      <ScrollView className="flex-1">
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => {
                if (notification.type === "BROADCAST") {
                  return;
                }
                // TODO: Redirect to topic
                console.log(notification.targetTopic);
              }}
            >
              <View className="bg-slate-200 px-2 py-2 rounded-lg my-1 mx-3 flex flex-row items-center">
                <View>
                  <Image
                    source={
                      notification.type === "BROADCAST"
                        ? require("./../../assets/notificationBell.png")
                        : {
                            uri: notification.actionUser.avatar,
                          }
                    }
                    className="w-14 h-14 rounded-full"
                  />
                  {notification.type !== "BROADCAST" && (
                    <Image
                      source={
                        notification.type === "COMMENT"
                          ? require("./../../assets/commentBubble.png")
                          : require("./../../assets/likeBubble.png")
                      }
                      className="w-5 h-5 rounded-full absolute right-0 -bottom-1"
                    />
                  )}
                </View>
                <View className="ml-2 flex-1 flex">
                  <Text numberOfLines={2} className="text-base">
                    {notification.message}
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