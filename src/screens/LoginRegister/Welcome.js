import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { login } from "../../feartures/auth/authSlice";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleGoToHome = () => {
    // Dispatch action login để chuyển sang AppTabs
    dispatch(login({ token: "dummy_token" }));
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/login/1.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/home/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Đi để trải nghiệm</Text>
        <Text style={styles.subtitle}>
          Du lịch bền vững - Trải nghiệm không giới hạn
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F9FF",
    alignItems: "center",
  },
  image: {
    width: width - 40,
    height: width - 0,
    borderRadius: 20,
    marginTop: 60,
  },
  content: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -40,
    // marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2483e0",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
