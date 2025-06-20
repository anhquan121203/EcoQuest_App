import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";

export default function TripScheduleModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Lịch trình chuyến đi</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Ngày 1 */}
            <Text style={styles.date}>Thứ 3{"\n"}17, 5 2025</Text>

            <View style={styles.card}>
              <View style={styles.timePrice}>
                <Text style={styles.title}>Khám phá thung lũng tình yêu</Text>
                <Text style={styles.price}>500.000 đ</Text>
              </View>
              <Text style={styles.desc}>Tham quan thung lũng tình yêu</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Check-in Khách sạn</Text>
              <Text style={styles.desc}>Nghỉ ngơi, ăn trưa tại khách sạn</Text>
              <View style={styles.locationRow}>
                <Entypo name="location-pin" size={16} color="#f39c12" />
                <Text style={styles.location}>1 Ngô Quyền, Đà Lạt</Text>
              </View>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.time}>18:00 - 19:09</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Đi dạo Hồ Xuân Hương</Text>
                <Text style={styles.desc}>Đi dạo, đạp xe quanh hồ</Text>
                <View style={styles.locationRow}>
                  <Entypo name="location-pin" size={16} color="#f39c12" />
                  <Text style={styles.location}>Đường Mai Anh Đào, Đà Lạt</Text>
                </View>
              </View>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.time}>19:00 - 23:59</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Về lại khách sạn</Text>
                <Text style={styles.desc}>Nghỉ đêm tại khách sạn</Text>
              </View>
            </View>

            {/* Ngày 2 */}
            <Text style={styles.date}>Thứ 4{"\n"}18, 4 2025</Text>

            <View style={styles.timeCard}>
              <Text style={styles.time}>08:00 - 11:30</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Tham quan vườn hoa thành phố</Text>
                <Text style={styles.desc}>Chụp ảnh, dạo chơi vườn hoa</Text>
              </View>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.time}>12:00 - 13:30</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Ăn trưa & nghỉ ngơi</Text>
                <Text style={styles.desc}>Ăn tại nhà hàng địa phương</Text>
                <View style={styles.locationRow}>
                  <Entypo name="location-pin" size={16} color="#f39c12" />
                  <Text style={styles.location}>123 Hùng Vương, Đà Lạt</Text>
                </View>
              </View>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.time}>14:00 - 17:00</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Tham quan Langbiang</Text>
                <Text style={styles.desc}>Leo núi và ngắm cảnh</Text>
              </View>
            </View>

            <View style={styles.timeCard}>
              <Text style={styles.time}>19:00 - 23:59</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Về khách sạn nghỉ</Text>
              </View>
            </View>

            {/* Ngày 3 */}
            <Text style={styles.date}>Thứ 5{"\n"}19, 6 2025</Text>

            <View style={styles.timeCard}>
              <Text style={styles.time}>08:00 - 09:00</Text>
              <View style={styles.detail}>
                <Text style={styles.title}>Check-out khách sạn</Text>
                <Text style={styles.desc}>Trả phòng khách sạn</Text>
                <View style={styles.locationRow}>
                  <Entypo name="location-pin" size={16} color="#f39c12" />
                  <Text style={styles.location}>1 Ngô Quyền, Đà Lạt</Text>
                </View>
              </View>
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  date: {
    marginTop: 20,
    marginBottom: 8,
    color: "#ff6b6b",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff4e6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  timeCard: {
    flexDirection: "row",
    backgroundColor: "#f1f2f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  time: {
    width: 80,
    color: "#555",
    fontWeight: "600",
  },
  detail: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3436",
  },
  desc: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  timePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "600",
    color: "#e67e22",
  },
});
