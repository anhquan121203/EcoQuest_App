import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useTrip from "../../../hooks/useTrip";
import Toast from "react-native-toast-message";

export default function TripScheduleAiScreen({ navigation }) {
  const route = useRoute();
  const { aiData, tripId } = route.params || {};
  const schedules = aiData?.data?.response || [];
  const { addNewtripSchedule } = useTrip();

  const handleConfirm = async () => {
    try {
      const payload = {
        tripId: tripId,
        tripScheduleDetails: schedules.map((item) => ({
          scheduleDate: item.scheduleDate,
          title: item.title,
          description: item.description,
          estimatedCost: item.estimatedCost || 0,
          startTime: item.startTime?.slice(0, 5), // HH:mm format
          endTime: item.endTime?.slice(0, 5),
          address: item.address,
          ...(item.serviceId ? { serviceId: item.serviceId } : {}),
        })),
      };

      console.log("AI Data:", payload);
      const res = await addNewtripSchedule(payload);
      console.log(" Response:", res);

      Toast.show({
        type: "success",
        text1: "Thành công!",
        text2: `Lịch trình gợi ý bằng AI đã được tạo!`,
      });
      navigation.navigate("TripDetail", { id: tripId });
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Có lỗi khi gửi dữ liệu");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.title}>Lịch trình của bạn 🧳</Text>

      {schedules.length > 0 ? (
        schedules.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>{item.scheduleDate}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <Text style={styles.info}>
              ⏰ {item.startTime} - {item.endTime}
            </Text>
            <Text style={styles.info}>📍 {item.address}</Text>
            <Text style={styles.info}>
              💰 {item.estimatedCost?.toLocaleString()}đ
            </Text>
            <Text style={styles.reason}>{item.reasonEstimatedCost}</Text>
            <Text style={styles.type}>🔖 Loại dịch vụ: {item.serviceType}</Text>
          </View>
        ))
      ) : (
        <Text>Không có dữ liệu AI</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.confirmBtn, styles.flexBtn]}
          onPress={() => navigation.navigate("TripDetail", { id: tripId })}
        >
          <Text style={styles.confirmText}>Quay lại</Text>
        </TouchableOpacity>

        {schedules.length > 0 && (
          <TouchableOpacity
            style={[styles.confirmBtn, styles.flexBtn]}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Xác nhận & Lưu</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fcff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0984e3",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2d3436",
  },
  desc: {
    fontSize: 14,
    color: "#636e72",
    marginVertical: 4,
  },
  info: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  reason: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    fontStyle: "italic",
  },
  type: {
    marginTop: 4,
    fontSize: 13,
    color: "#6c5ce7",
  },
  confirmBtn: {
    backgroundColor: "#00b894",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, 
    marginTop: 20,
  },
  flexBtn: {
    flex: 1, 
  },
  confirmBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});
