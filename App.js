import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useRef, useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Loading from "./src/components/Loading";
import TokenContext from "./src/contexts/TokenContext";
import service, { removeHeaderConfig } from "./src/helper/axiosService";
import ForumTabs from "./src/tabs/ForumTabs";
import MapTabs from "./src/tabs/MapTabs";
import UserTabs from "./src/tabs/UserTabs";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { showAlert } from "./src/helper/CustomAlert";
import NotificationScreen from "./src/screens/NotificationScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigationRef = useRef();

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        service.get("/check-token").then(
          (res) => {
            if (res.data.status === 200) {
              setToken(storedToken);
              setLoading(false);
            }
          },
          (reject) => {
            console.log("Failed");
            setLoading(false);
          }
        );
      } else {
        setLoading(false);
      }
    };

    loadToken();

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data === undefined || data === null) {
          navigationRef.current?.navigate("NotificationScreen");
        }
        navigationRef.current?.navigate("ForumTab", {
          screen: "Topic",
          params: {
            topic: data,
          },
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (token && expoPushToken !== "") {
      service
        .post("/notification-token", {
          token: expoPushToken,
        })
        .catch((err) => {
          console.log("Error registering for push notifications ", err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (expoPushToken !== "") {
      service
        .post("/notification-token", {
          token: expoPushToken,
        })
        .catch((err) => {
          console.log("Error registering for push notifications ", err);
        });
    }
  }, [expoPushToken]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {loading && <Loading full={true} />}
      <PaperProvider>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            initialRouteName="MapTab"
            screenOptions={{ tabBarShowLabel: false, pressColor: "#AACCFF" }}
            // labeled={false}
            shifting={true}
            backBehavior="history"
            barStyle={styles.bottomBar}
            activeColor="black"
            inactiveColor="gray"
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="forum-outline"
                    size={24}
                    color={color}
                  />
                ),
                tabBarLabel: "Diễn đàn",
              }}
              name="ForumTab"
              component={ForumTabs}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="map-pin" size={24} color={color} />
                ),
                tabBarLabel: "Bản đồ",
              }}
              name="MapTab"
              component={MapTabs}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="ios-notifications-outline"
                    size={24}
                    color="black"
                  />
                ),
                tabBarLabel: "Thông báo",
              }}
              name="NotificationScreen"
              component={NotificationScreen}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  if (!token) {
                    showAlert("Bạn cần đăng nhập để dùng chức năng này");
                    return;
                  }
                  navigation.navigate("NotificationScreen");
                },
              })}
            ></Tab.Screen>
            <Tab.Screen
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="user" size={24} color={color} />
                ),
                tabBarLabel: "Trang cá nhân",
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate("UserTab", {
                    screen: token ? " " : "Login",
                  });
                },
              })}
              name="UserTab"
              component={UserTabs}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <StatusBar style="auto" />
    </TokenContext.Provider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottomBar: {
    backgroundColor: "white",
    height: ScreenHeight * 0.09,
  },
});
