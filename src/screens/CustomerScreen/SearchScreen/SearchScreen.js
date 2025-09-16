import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Icon hoặc hình minh hoạ */}
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>🚧 Coming Soon 🚧</Text>
      <Text style={styles.subtitle}>
        Tính năng này đang được phát triển. Vui lòng quay lại sau!
      </Text>

      {/* Nút quay lại */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});

export default SearchScreen;
