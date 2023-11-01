import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet
} from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Loading from "./src/components/Loading";
import TokenContext from "./src/contexts/TokenContext";
import service, {
  removeHeaderConfig
} from "./src/helper/axiosService";
import ForumTabs from "./src/tabs/ForumTabs";
import MapTabs from "./src/tabs/MapTabs";
import UserTabs from "./src/tabs/UserTabs";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        service.get("/check-token").then(
          (res) => {
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

    loadToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {loading && <Loading/>}
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
