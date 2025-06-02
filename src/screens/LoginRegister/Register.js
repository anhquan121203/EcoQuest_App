import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { theme } from "../../themes/theme";
import { CustomButton } from "../../components/Button";
import { registerUser } from "../../api/apiAuth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
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
      console.log(userData)
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Registered successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Register error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
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
});
