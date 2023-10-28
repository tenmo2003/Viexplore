import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Loading from "./src/components/Loading";
import TokenContext from "./src/contexts/TokenContext";
import ForumScreen from "./src/screens/ForumScreen";
import MapScreen from "./src/screens/MapScreen";
import UserTabs from "./src/tabs/UserTabs";
import MapTabs from "./src/tabs/MapTabs";
import service, {
  getAllHeaderConfig,
  removeHeaderConfig,
} from "./src/helper/axiosService";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { ScreenHeight } from "react-native-elements/dist/helpers";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      console.log(storedToken);
      if (storedToken) {
        service.get("/check-token").then(
          (res) => {
            async function removeToken() {
              await SecureStore.deleteItemAsync("token");
            }
            if (res.data.message === "Success") {
              setToken(storedToken);
              console.log("Token valid");
            } else {
              console.log("token expired");
              removeToken();
              removeHeaderConfig("Authorization");
            }
            setLoading(false);
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

    console.log("checking token");

    loadToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="MapTab"
            screenOptions={{ tabBarShowLabel: false }}
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
              component={ForumScreen}
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
                  <AntDesign name="user" size={24} color={color} />
                ),
                tabBarLabel: "Trang cá nhân",
              }}
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
