import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../feartures/auth/authSlice";
import { loginUser } from "../../api/apiAuth";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import WaveBackground from "../../components/WaveBackground";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 thêm state
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      if (access_token && refresh_token) {
        await AsyncStorage.setItem("access_token", access_token);
        await AsyncStorage.setItem("refresh_token", refresh_token);
        dispatch(login({ access_token, refresh_token }));
        Toast.show({
          type: "success",
          text1: "🎉 Đăng nhập thành công!",
        });
        navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng nhập không thành công!",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập không thành công!",
        text2: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <WaveBackground style={styles.svgBackground} />

            <View style={styles.formContainer}>
              <Text style={styles.title}>Đăng nhập</Text>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={18} color="#aaa" />
                <TextInput
                  style={styles.input}
                  placeholder="eco@email.com"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color="#aaa" />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu..."
                  secureTextEntry={!showPassword} // 👈 đổi theo state
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.optionRow}>
                <TouchableOpacity
                  style={styles.rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={[styles.checkbox, rememberMe && styles.checkedBox]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.optionText}>Nhớ mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Chưa có tài khoản?{" "}
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.navigate("Register")}
                >
                  Đăng ký
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  svgBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: 300,
    height: 300,
    zIndex: 2,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#2483e0",
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#ff7f7f",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  forgotText: {
    fontSize: 14,
    color: "#2483e0",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#2483e0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  signUpText: {
    color: "#2483e0",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
