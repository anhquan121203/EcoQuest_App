import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import WaveBackground from "../../components/WaveBackground";
import { registerUser, verifyUser } from "../../api/apiAuth";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Toast.show({ type: "error", text1: "Vui lòng nhập đầy đủ thông tin" });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Mật khẩu không khớp" });
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ email, password, firstName, lastName });
      if ((res.status === 200 || res.status === 201) && res.data?.success) {
        Toast.show({
          type: "success",
          text1: "Đăng ký thành công!",
          text2: "Vui lòng nhập mã xác minh được gửi đến email.",
        });
        setVerifyModalVisible(true);
      } else {
        Toast.show({ type: "error", text1: res.data?.message || "Đăng ký thất bại" });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyCode) {
      Toast.show({ type: "error", text1: "Vui lòng nhập mã xác minh" });
      return;
    }

    setVerifying(true);
    try {
      const res = await verifyUser({ email, key: verifyCode });
      if (res.status === 200) {
        Toast.show({ type: "success", text1: "Xác minh thành công!" });
        setVerifyModalVisible(false);
        navigation.navigate("Login");
      } else {
        Toast.show({ type: "error", text1: "Mã xác minh không đúng hoặc hết hạn" });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Lỗi xác minh",
        text2: err.response?.data?.message || err.message,
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <WaveBackground style={styles.svgBackground} />

            <View style={styles.formContainer}>
              <Text style={styles.title}>Đăng ký</Text>

              <Text style={styles.label}>Họ và Tên</Text>
              <View style={styles.rowContainer}>
                <View style={styles.inputHalf}>
                  <Ionicons name="person-outline" size={18} color="#aaa" />
                  <TextInput
                    style={styles.input}
                    placeholder="Họ"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
                <View style={[styles.inputHalf, { marginLeft: 10 }]}>
                  <Ionicons name="person-outline" size={18} color="#aaa" />
                  <TextInput
                    style={styles.input}
                    placeholder="Tên"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={18} color="#aaa" />
                <TextInput
                  style={styles.input}
                  placeholder="eco@email.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color="#aaa" />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu..."
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Text style={styles.label}>Xác nhận mật khẩu</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color="#aaa" />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập lại mật khẩu..."
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleRegister} disabled={loading}>
                <Text style={styles.loginButtonText}>
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Đã có tài khoản?{" "}
                <Text style={styles.signUpText} onPress={() => navigation.navigate("Login")}>
                  Đăng nhập
                </Text>
              </Text>
            </View>

            {/* Modal xác minh */}
            <Modal visible={verifyModalVisible} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.title}>Xác minh Email</Text>
                  <TextInput
                    style={[styles.input, { borderBottomWidth: 1, borderColor: "#ccc", marginBottom: 20 }]}
                    placeholder="Mã xác minh (6 số)"
                    value={verifyCode}
                    onChangeText={setVerifyCode}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                  <TouchableOpacity style={styles.loginButton} onPress={handleVerify}>
                    <Text style={styles.loginButtonText}>
                      {verifying ? "Đang xác minh..." : "Xác minh"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setVerifyModalVisible(false)}>
                    <Text style={[styles.footerText, { marginTop: 20 }]}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff"},
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
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    gap: 10,
  },
  inputHalf: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#2483e0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
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
    marginTop: 20,
  },
  signUpText: {
    color: "#2483e0",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    elevation: 5,
  },
});
