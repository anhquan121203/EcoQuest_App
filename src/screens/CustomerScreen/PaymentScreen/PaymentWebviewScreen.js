import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function PaymentWebviewScreen() {
  const navigation = useNavigation();
  const { checkoutUrl } = useRoute().params;

  const handleNavigationChange = (navState) => {
    if (
      navState.url.includes("success") ||
      navState.url.includes("paid") ||
      navState.url.includes("payment-success") ||
      navState.url.includes("returnUrl") ||
      navState.url.includes("MOBILE_RETURN_URL")
    ) {
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Xác nhận hủy",
      "Bạn có chắc chắn muốn hủy thanh toán không?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          style: "destructive",
          onPress: () => {
            Toast.show({
              type: "info",
              text1: "🚫 Đã hủy thanh toán",
              text2: "Bạn đã quay lại ứng dụng.",
            });
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={handleNavigationChange}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#4e73df" style={{ flex: 1 }} />
        )}
      />

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>Hủy thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
