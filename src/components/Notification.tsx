import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import TimeAgo from "react-native-timeago";
export function Notification({ notification, navigation }) {
  const [expanded, setExpanded] = useState(false);

  const getSmallIcon = (type) => {
    switch (type) {
      case "BROADCAST":
        return <></>;
      case "COMMENT":
        return (
          <Image
            source={require("./../../assets/commentBubble.png")}
            className="w-5 h-5 rounded-full absolute right-0 -bottom-1"
          />
        );
      case "UPVOTE":
        return (
          <Image
            source={require("./../../assets/likeBubble.png")}
            className="w-5 h-5 rounded-full absolute right-0 -bottom-1"
          />
        );
      case "VIOLATE":
        return (
          <Image
            source={require("./../../assets/alertBubble.png")}
            className="w-5 h-5 rounded-full absolute right-0 -bottom-1"
          />
        );
      case "REPORT":
        return (
          <Image
            source={require("./../../assets/alertBubble.png")}
            className="w-5 h-5 rounded-full absolute right-0 -bottom-1"
          />
        );
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (
          notification.type === "BROADCAST" ||
          notification.type === "REPORT"
        ) {
          return;
        } // TODO: Redirect to topic

        navigation.navigate("ForumTab", {
          screen: "Topic",
          params: {
            topic: notification.targetTopic,
          },
        });
      }}
    >
      <View className="bg-slate-200 px-2 py-2 rounded-lg my-1 mx-3 flex flex-row items-center">
        <View>
          <Image
            source={
              notification.type === "VIOLATE" || notification.type === "REPORT"
                ? require("./../../assets/notificationBell.png")
                : notification.type === "BROADCAST"
                ? require("./../../assets/broadcastBubble.png")
                : {
                    uri: notification.actionUser.avatar,
                  }
            }
            className="w-14 h-14 rounded-full"
          />
          {getSmallIcon(notification.type)}
        </View>
        <View className="ml-2 flex-1 flex">
          <Text numberOfLines={expanded ? 20 : 2} className="text-base">
            {notification.message}
          </Text>
          <TimeAgo time={notification.timestamp} />
        </View>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <MaterialIcons
            name={expanded ? "expand-less" : "expand-more"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
