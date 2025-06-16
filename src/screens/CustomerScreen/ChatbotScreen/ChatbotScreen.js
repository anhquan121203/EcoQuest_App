import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // hoặc dùng FontAwesome nếu bạn thích

const ChatbotScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{
          uri: "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/16/03/20250616030416-46ITBWU0.json",
        }}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: 0,
  },

  backButton: {
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    zIndex: 1,
  },
  
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#007AFF",
  },

  webview: {
    flex: 1,
    top: 30,
  },
});

export default ChatbotScreen;
