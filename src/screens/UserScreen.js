import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import { BottomTabBarHeightCallbackContext, BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const BottomTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const Post = () => {
    return (
      <View >
        <Text>
          Post
        </Text>
      </View>
    )
  }
  const Forums = () => {
    return (
      <View>
        <Text>
          Forums
        </Text>
      </View>
    )
  }
  return (
    <Tab.Navigator style={{ marginTop: -450 }}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "bookmarks" : "bookmarks";
            color = focused ? "#52575D" : "#AEB5BC";
          } else if (route.name === "Save") {
            iconName = focused ? "heart" : "heart";
            color = focused ? "#52575D" : "#AEB5BC";
          }
          return <Ionicons name={iconName} color={color} size={23} />;
        }
      })}>
      <Tab.Screen name="Post" component={Post}></Tab.Screen>
      <Tab.Screen name="Save" component={Forums}></Tab.Screen>
    </Tab.Navigator>
  )
}


const UserScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
        
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="settings-outline" size={23} color="#52575D" style={{ marginTop: 20, left: 350 }}></Ionicons>
          </TouchableOpacity>
        
        </View>
        
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require('./../../assets/ava.png')} style={styles.image} resizeMode="center"></Image>
          </View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={23} color="#DFD8C8" style={{ marginTop: -2, marginLeft: -1 }}></Ionicons>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 20, fontWeight: 'bold' }]}>MingMing</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14, fontStyle: 'italic', marginBottom: 5 }]}>Đ thích code</Text>
        </View>
      </ScrollView>
      <BottomTab />
    </View>


  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "#ffff",
    },

    text: {
      // fontFamily: 'Cochin',
      color: "#52575D",
      top: 5
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
      borderRadius: 100
    },
    titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",

      marginHorizontal: 16
    },
    profileImage: {
      marginTop: 50,
      width: 100,
      height: 100,
      overflow: "hidden",

    },
    add: {
      backgroundColor: "#41444B",
      position: "absolute",
      left: 70,
      top: 130,
      width: 20,
      height: 20,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
    },
    info: {
      position: "relative",
      alignSelf: "center",
      alignItems: "center",
    },

  }
)
export default UserScreen;