import React, { use } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import usePayment from "../../../hooks/usePayment";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import useAuth from "../../../hooks/useAuth";

const plans = [
  {
    price: "0đ",
    title: "Miễn phí",
    features: [
      { text: "Xem thông tin địa điểm du lịch", included: true },
      { text: "Lưu yêu thích địa điểm", included: true },
      { text: "Hỗ trợ lịch trình cá nhân", included: false },
      { text: "Hướng dẫn viên trực tuyến", included: false },
    ],
    colors: ["#ff5f6d", "#ffc371"],
  },
  {
    price: "100.000đ",
    title: "Nâng cao",
    features: [
      { text: "Xem thông tin địa điểm du lịch", included: true },
      { text: "Lưu yêu thích địa điểm", included: true },
      { text: "Hỗ trợ lịch trình cá nhân", included: false },
      { text: "Hướng dẫn viên trực tuyến", included: false },
    ],
    colors: ["#36d1dc", "#5b86e5"],
  },
];

export default function PremierScreen() {
  const { createPremier } = usePayment();
  const navigation = useNavigation();

  const { userType } = useAuth();

  const handlePremierPayment = async () => {
    try {
      
      const result = await createPremier();
      if (result.success) {
        const checkoutUrl = result.data?.response?.checkoutUrl;
        console.log(checkoutUrl);
        if (checkoutUrl) {
          Toast.show({
            type: "success",
            text1: "🎉 Đang chuyển đến cổng thanh toán...",
          });
          navigation.navigate("PremierWebview", { checkoutUrl });
        } else {
          Toast.show({
            type: "error",
            text1: "Tài khoản của bạn đã được nâng cấp thành công!",
          });
        }
      } else {
        Toast.show({ type: "error", text1: "❌ Thanh toán Premier thất bại" });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "😢 Có lỗi xảy ra, vui lòng thử lại",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {plans.map((plan, index) => (
          <View key={index} style={styles.card}>
            <View
              style={[
                styles.priceContainer,
                { backgroundColor: plan.colors[0] },
              ]}
            >
              <Text style={styles.priceText}>{plan.price}</Text>
              <Text style={styles.perText}>Mỗi / Tháng</Text>
            </View>
            <Text style={styles.title}>{plan.title}</Text>
            <View style={styles.featuresList}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureItem}>
                  <Text style={{ color: feature.included ? "green" : "red" }}>
                    {feature.included ? "✔" : "✖"}
                  </Text>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>
            {plan.title === "Nâng cao" && (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: userType === "Premier" ? "#ccc" : plan.colors[0],
                  },
                ]}
                onPress={handlePremierPayment}
                disabled={userType === "Premier"}
              >
                <Text style={styles.buttonText}>
                  {userType === "Premier" ? "Không khả dụng" : "Đặt hàng ngay"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scrollContent: {
    flexDirection: "column",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 70,
  },
  card: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 16,
    alignItems: "center",
    margin: 20,
  },
  priceContainer: {
    width: "100%",
    paddingVertical: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
  },
  priceText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  perText: { color: "#fff", fontSize: 14 },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  featuresList: { width: "100%", paddingHorizontal: 16 },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  featureText: { marginLeft: 8, fontSize: 14, color: "#333" },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
