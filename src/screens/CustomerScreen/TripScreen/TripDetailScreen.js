import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import useTrip from "../../../hooks/useTrip";
import { useNavigation, useRoute } from "@react-navigation/native";
import TripScheduleDetailModal from "./TripScheduleDetailModal";
import usePayment from "../../../hooks/usePayment";
import Toast from "react-native-toast-message";

export default function TripDetailScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { id } = route.params;
  const { selectedTrip, tripById } = useTrip();
  const navigation = useNavigation();
  const { payments, addNewPayment } = usePayment();

  useEffect(() => {
    if (id) {
      tripById(id);
    }
  }, [id]);

  if (!selectedTrip) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy chuyến đi.</Text>
      </View>
    );
  }

  const handlePayment = async () => {
    const paymentData = {
      tripId: id,
    };

    try {
      const result = await addNewPayment(paymentData);

      if (result.success) {
        const checkoutUrl = result.data?.response?.checkoutUrl;

        if (checkoutUrl) {
          Toast.show({
            type: "success",
            text1: "🎉 Đang chuyển đến cổng thanh toán...",
          });

          navigation.navigate("PaymentWebview", { checkoutUrl });
        } else {
          Toast.show({
            type: "error",
            text1: "❌ Không tìm thấy đường dẫn thanh toán",
            text2: "Vui lòng thử lại sau.",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "❌ Tạo thanh toán thất bại!",
          text2: "Vui lòng kiểm tra lại thông tin.",
        });
        console.error("Failed to create payment:", result);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "😢 Có lỗi xảy ra!",
        text2: "Vui lòng thử lại sau.",
      });
      console.error("Error creating payment:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ImageBackground
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/007/264/314/non_2x/the-concept-travel-the-world-on-the-airplanes-vector.jpg",
          }}
          style={styles.headerImage}
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View style={styles.overlay}>
            <Text style={styles.tripName}>{selectedTrip.tripName}</Text>
            <Text style={styles.userName}>
              Người tạo: {selectedTrip.firstName} {selectedTrip.lastName}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.detailContainer}>
          <View style={styles.card}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#4e73df"
            />
            <Text style={styles.cardText}>{selectedTrip.description}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.cardSmall}>
              <FontAwesome5 name="calendar-alt" size={20} color="#20c997" />
              <Text style={styles.cardLabel}>Bắt đầu</Text>
              <Text style={styles.cardValue}>{selectedTrip.startDate}</Text>
            </View>

            <View style={styles.cardSmall}>
              <FontAwesome5 name="calendar-check" size={20} color="#20c997" />
              <Text style={styles.cardLabel}>Kết thúc</Text>
              <Text style={styles.cardValue}>{selectedTrip.endDate}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cardSmall}>
              <Ionicons name="people-outline" size={22} color="#ff9f43" />
              <Text style={styles.cardLabel}>Số người</Text>
              <Text style={styles.cardValue}>
                {selectedTrip.numberOfPeople}
              </Text>
            </View>

            <View style={styles.cardSmall}>
              <MaterialIcons name="attach-money" size={24} color="#00b894" />
              <Text style={styles.cardLabel}>Chi phí</Text>
              <Text style={styles.cardValue}>
                {selectedTrip.totalEstimatedCost?.toLocaleString()}đ
              </Text>
            </View>
          </View>
        </View>

        <TripScheduleDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          id={selectedTrip.tripId}
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            alignSelf: "center",
            marginTop: 10,
            padding: 10,
            backgroundColor: "#2a9df4",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Xem lịch trình
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Nút cố định dưới cùng */}
      <View style={styles.fixedBottomButtons}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() =>
            navigation.navigate("TripSchedule", { id: selectedTrip.tripId })
          }
        >
          <Ionicons name="calendar" size={18} color="#fff" />
          <Text style={styles.buttonText}>Tạo lịch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.middleButton}
          
        >
          <Ionicons name="sparkles-outline" size={18} color="#fff" style={{marginRight: 8}}/>
          <Text style={styles.buttonText}>Tạo AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightButton} onPress={handlePayment}>
          <Text style={styles.paymentText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fc",
  },
  headerImage: {
    height: 270,
    justifyContent: "flex-end",
    padding: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    padding: 10,
  },
  tripName: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 14,
    color: "#f1f1f1",
    marginTop: 4,
  },
  detailContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 15,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#888",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  // Fotter button **************************************
  fixedBottomButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    height: "10%",
  },
  leftButton: {
    flex: 1,
    backgroundColor: "#00b894",
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 10,
  },

  middleButton: {
    flex: 1,
    backgroundColor: "#0984e3",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  
  rightButton: {
    flex: 1.2,
    backgroundColor: "#e74c3c",
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  paymentText: {
    color: "#fff",
    fontSize: 13,
  },
  paymentAmount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
