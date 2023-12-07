import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import service from "../helper/axiosService";
import Loading from "../components/Loading";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import TimeAgo from "react-native-timeago";
import { MaterialIcons } from "@expo/vector-icons";
import { Notification } from "../components/Notification";

export default function NotificationScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  let moment = require("moment");
  require("moment/locale/vi");
  moment.locale("vi");

  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await service.get("/notifications");
          setNotifications(response.data.results.reverse());
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      // Cleanup function if needed (not necessary in this case)
      return () => {
        // Cleanup logic here (if any)
      };
    }, [])
  );

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
      <Text className="text-3xl font-bold mt-3 ml-3">Thông báo</Text>
      <ScrollView className="flex-1">
        {notifications &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
}
