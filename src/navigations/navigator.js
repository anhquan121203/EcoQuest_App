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
import VerifyModal from "../screens/LoginRegister/VerifyScreen";
import AtractionDetails from "../screens/CustomerScreen/AttractionScreen/AtractionDetails";
import ProfileScreen from "../screens/CustomerScreen/ProfileScreen/ProfileScreen";
import HotelDetails from "../screens/CustomerScreen/HotelScreen/HotelDetails";
import HotelMore from "../screens/CustomerScreen/HotelScreen/HotelMore";
import ChatbotScreen from "../screens/CustomerScreen/ChatbotScreen/ChatbotScreen";
import BlogScreen from "../screens/CustomerScreen/BlogScreen/BlogScreen";
import TripHistoryScreen from "../screens/CustomerScreen/TripScreen/TripHistoryScreen";
import CreateTripScreen from "../screens/CustomerScreen/TripScreen/CreateTripScreen";
import PostBlogScreen from "../screens/CustomerScreen/BlogScreen/PostBlogScreen";
import BlogDetailScreen from "../screens/CustomerScreen/BlogScreen/BlogDetailScreen";
import TripDetailScreen from "../screens/CustomerScreen/TripScreen/TripDetailScreen";
import CreateTripScheduleScreen from "../screens/CustomerScreen/TripScreen/CreateTripScheduleScreen";
import TripScheduleAiScreen from "../screens/CustomerScreen/TripScheduleScreen/TripScheduleAiScreen";
import TripScheduleScreen from "../screens/CustomerScreen/TripScreen/TripScheduleScreen";
import PaymentWebviewScreen from "../screens/CustomerScreen/PaymentScreen/PaymentWebviewScreen";
import PaymentHistoryScreen from "../screens/CustomerScreen/PaymentHistoryScreen/PaymentHistoryScreen";
import PremierScreen from "../screens/CustomerScreen/PremierScreen/PremierScreen";
import PremierWebviewScreen from "../screens/CustomerScreen/PaymentScreen/PremierWebviewScreen";

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
      {/* <Stack.Screen
        name="TripHistory"
        component={TripHistoryScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
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
      <Stack.Screen
        name="ChatbotScreen"
        component={ChatbotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostBlogScreen"
        component={PostBlogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="TripDetail"
        component={TripDetailScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="CreateTripSchedule"
        component={CreateTripScheduleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TripSchedule"
        component={TripScheduleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentWebview"
        component={PaymentWebviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PremierWebview"
        component={PremierWebviewScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="TripScheduleAi"
        component={TripScheduleAiScreen}
        options={{ headerShown: false }}
      /> */}
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
          else if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
          else if (route.name === "TripHistory")
            iconName = focused ? "calendar" : "calendar-outline";
          else if (route.name === "PremierScreen")
            iconName = focused ? "diamond" : "diamond-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Tìm kiếm",
        }}
      />
      <Tab.Screen
        name="TripHistory"
        component={TripHistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Chuyến đi",
        }}
      />
      <Tab.Screen
        name="PremierScreen"
        component={PremierScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Nâng cấp",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Hồ sơ",
        }}
      />
    </Tab.Navigator>
  );
}

// Main stack for authenticated users
function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="TripHistory" component={TripHistoryScreen} />
      <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
      <Stack.Screen name="AttractionDetails" component={AtractionDetails} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="HotelMore" component={HotelMore} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="PostBlogScreen" component={PostBlogScreen} />
      <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
      <Stack.Screen name="TripDetail" component={TripDetailScreen} />
      <Stack.Screen
        name="CreateTripSchedule"
        component={CreateTripScheduleScreen}
      />
      <Stack.Screen name="TripSchedule" component={TripScheduleScreen} />
      <Stack.Screen name="PaymentWebview" component={PaymentWebviewScreen} />
      <Stack.Screen name="PremierWebview" component={PremierWebviewScreen} />
      <Stack.Screen name="TripScheduleAi" component={TripScheduleAiScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
    </Stack.Navigator>
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
      {isLoggedIn ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
