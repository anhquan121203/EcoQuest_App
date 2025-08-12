import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function PaymentWebviewScreen() {
  const navigation = useNavigation();
  const { checkoutUrl } = useRoute().params;

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNavigationChange = (navState) => {
    if (
      navState.url.includes("success") ||
      navState.url.includes("paid") ||
      navState.url.includes("payment-success") ||
      navState.url.includes("returnUrl") ||
      navState.url.includes("MOBILE_RETURN_URL")
    ) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        // if (typeof onPaymentSuccess === "function") {
        //   onPaymentSuccess();
        // } else {
        //   navigation.navigate("Home");
        // }
        navigation.navigate("Home");
      }, 5000);
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

      {/* Modal Thanh toán thành công */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Thanh toán thành công!</Text>
            <Text style={styles.modalMessage}>
              Bạn sẽ được chuyển về trang chủ sau vài giây...
            </Text>
            <ActivityIndicator
              size="large"
              color="#28a745"
              style={{ marginTop: 20 }}
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});
