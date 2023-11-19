import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import ForumScreen from "../screens/ForumScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import CommentScreen from "../screens/CommentScreen";
import TopicDetailScreen from "../screens/TopicDetailScreen";

const Stack = createStackNavigator();

export default function ForumTabs({ navigation }) {
  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Forum"
      >
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Comment" component={CommentScreen} />
        <Stack.Screen name="Topic" component={TopicDetailScreen} />
      </Stack.Navigator>
    </View>
  );
}