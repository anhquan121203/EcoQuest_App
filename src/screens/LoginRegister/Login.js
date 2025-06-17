import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Button, Touchable } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../themes/theme";
import { CustomButton } from "../../components/Button";
import { login } from "../../feartures/auth/authSlice";
import { loginUser } from "../../api/apiAuth";
import useAuth from "../../hooks/useAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { firstName, lastName } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      if (access_token && refresh_token) {
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        dispatch(login({access_token, refresh_token}));
        Alert.alert(
          "Đăng nhập thành công!",
          `Chào mừng: ${firstName} ${lastName} || "người dùng"}`
        );
        navigation.navigate("Home");
      } else {
        Alert.alert("Đăng nhập thất bại", "Vui lòng kiểm tra lại thông tin");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || // lỗi trả về từ server
        err.message || // lỗi chung
        "Đã xảy ra lỗi không xác định";

      Alert.alert("Đăng nhập thất bại", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG NHẬP </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <CustomButton title="ĐĂNG NHẬP" onPress={handleLogin} type="primary" />
        <View style={styles.buttonSpacer} />
        <CustomButton
          title="TRỞ VỀ"
          onPress={() => navigation.navigate("Welcome")}
          type="secondary"
        />
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Bạn chưa có tài khoản?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký ngay
          </Text>
        </Text>
      </View>

      <View style={styles.registerContainer}>
        <Button title="Trang chủ" onPress={() => navigation.navigate("Home")}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.large,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.large,
  },
  input: {
    width: "100%",
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    marginBottom: theme.spacing.medium,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonSpacer: {
    height: theme.spacing.medium,
  },
  registerContainer: {
    marginTop: theme.spacing.large,
    alignItems: "center",
  },
  registerText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  registerLink: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
