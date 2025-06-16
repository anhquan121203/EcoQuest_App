import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Modal } from "react-native";
import { theme } from "../../themes/theme";
import { CustomButton } from "../../components/Button";
import { registerUser, verifyUser } from "../../api/apiAuth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    setLoading(true);

    const userData = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const response = await registerUser(userData);
      console.log("Register API response:", response);
    
      if ((response.status === 200 || response.status === 201) && response.data?.success) {
        Alert.alert("Đăng ký thành công", "Vui lòng nhập mã xác minh email");
        setVerifyModalVisible(true);
      } else {
        Alert.alert("Lỗi", response.data?.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Register error:", error?.message);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || error.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  const handleVerify = async () => {
    if (!verifyCode) {
      Alert.alert("Lỗi", "Vui lòng nhập mã xác minh");
      return;
    }

    setVerifying(true);
    try {
      const response = await verifyUser({ email, key: verifyCode });

      if (response.status === 200) {
        Alert.alert("✅ Thành công", "Tài khoản đã được xác minh", [
          { text: "Đăng nhập", onPress: () => navigation.navigate("Login") },
        ]);
        setVerifyModalVisible(false);
      } else {
        Alert.alert("Lỗi", "Mã xác minh không đúng hoặc đã hết hạn.");
      }
    } catch (error) {
      console.error("Verify error:", error);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Có lỗi xảy ra khi xác minh."
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG KÝ</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title={loading ? "Đang đăng ký..." : "ĐĂNG KÝ"}
          onPress={handleRegister}
          type="primary"
          disabled={loading}
        />
        <View style={styles.buttonSpacer} />
        <CustomButton
          title="TRỞ VỀ ĐĂNG NHẬP"
          onPress={() => navigation.navigate("Login")}
          type="secondary"
          disabled={loading}
        />
      </View>

      {/* Verify Code Modal */}
      <Modal visible={verifyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Nhập mã xác minh (6 chữ số)</Text>
            <TextInput
              style={styles.input}
              placeholder="Mã xác minh"
              value={verifyCode}
              onChangeText={setVerifyCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <CustomButton
              title={verifying ? "Đang xác minh..." : "XÁC MINH"}
              onPress={handleVerify}
              type="primary"
              disabled={verifying}
            />
            <View style={styles.buttonSpacer} />
            <CustomButton
              title="Đóng"
              onPress={() => setVerifyModalVisible(false)}
              type="secondary"
            />
          </View>
        </View>
      </Modal>
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
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    marginBottom: theme.spacing.medium,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonSpacer: {
    height: theme.spacing.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});
