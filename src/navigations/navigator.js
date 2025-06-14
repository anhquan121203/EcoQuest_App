import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import WelcomeScreen from "../screens/LoginRegister/Welcome";
import LoginScreen from "../screens/LoginRegister/Login";
import HomeScreen from "../screens/CustomerScreen/HomeScreen";
import RegisterScreen from "../screens/LoginRegister/Register";
import VerifyByLinkScreen from "../screens/LoginRegister/VerifyScreen";
import VerifyModal from "../screens/LoginRegister/VerifyScreen";
import AtractionDetails from "../screens/CustomerScreen/AttractionScreen/AtractionDetails";
import ProfileScreen from "../screens/CustomerScreen/ProfileScreen/ProfileScreen";
import HotelDetails from "../screens/CustomerScreen/HotelScreen/HotelDetails";
import HotelMore from "../screens/CustomerScreen/HotelScreen/HotelMore";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyModal}
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AttractionDetails"
        component={AtractionDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HotelDetails"
        component={HotelDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HotelMore"
        component={HotelMore}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          else if (route.name === "Schedule")
            iconName = focused ? "calendar" : "calendar-outline";
          else if (route.name === "Notifications")
            iconName = focused ? "notifications" : "notifications-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        dispatch(login({ token }));
      }
    };
    checkLogin();
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
