import React, { useState } from "react";
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
import queryString from "query-string";
import usePayment from "../../../hooks/usePayment";

export default function PaymentWebviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { checkoutUrl } = route.params;
  const { paymentURLCallBack } = usePayment();

  const [loading, setLoading] = useState(true);

  const handlePaymentCallback = async (url) => {
    console.log("🔍 Callback URL detect:", url);

    const parsed = queryString.parseUrl(url);
    const { tripId, code, cancel } = parsed.query;

    console.log("✅ Payment callback params:", {
      cancel,
      code,
      tripId,
    });

    if (tripId && code) {
      // Nếu hủy thanh toán
      if (cancel === "true" || status === "CANCELLED") {
        Toast.show({
          type: "info",
          text1: "Bạn đã hủy thanh toán",
        });
        navigation.goBack();
        return;
      }

      try {
        const res = await paymentURLCallBack({
          tripId,
          code,
          cancel: cancel === "true",
        });
        console.log("Payment callback response:", res);

        Toast.show({
          type: "success",
          text1: "Thanh toán thành công",
        });

        navigation.goBack();
      } catch (err) {
        console.error("Payment callback error:", err);
        Toast.show({
          type: "error",
          text1: "Có lỗi khi xử lý thanh toán",
        });
      }
    } else {
      console.warn(`⚠ Không lấy được tripId hoặc code từ URL: ${url}`);
    }
  };

  // Bắt redirect ngay lập tức
  const handleNavigationRequest = (request) => {
    const { url } = request;
    console.log("🌐 onShouldStartLoadWithRequest URL:", url);

    if (url.includes("tripId=") && url.includes("code=")) {
      handlePaymentCallback(url);
      return false; // Chặn load trang mới
    }

    if (
      url.startsWith("myapp://payment") ||
      url.includes("localhost:3000/payment")
    ) {
      handlePaymentCallback(url);
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: checkoutUrl }}
        onLoadEnd={() => setLoading(false)}
        onShouldStartLoadWithRequest={handleNavigationRequest}
      />
      {loading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          size="large"
          color="#000"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
