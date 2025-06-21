import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import useTrip from "../../../hooks/useTrip"; // Hook lấy dữ liệu chuyến đi

export default function TripScheduleDetailModal({ visible, onClose, id }) {
  const { tripScheduleByTripId, selectedTripSchedule } = useTrip();

  useEffect(() => {
    if (visible && id) {
      tripScheduleByTripId(id);
    }
  }, [visible, id]);


  // Group dữ liệu theo scheduleDate
  const groupedData = Array.isArray(selectedTripSchedule)
    ? selectedTripSchedule.reduce((acc, item) => {
        const date = item.scheduleDate;
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {})
    : {};

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>📅 Lịch trình chuyến đi</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            {Object.keys(groupedData).map((date) => (
              <View key={date} style={styles.dayGroup}>
                <Text style={styles.dateText}>{date}</Text>
                {groupedData[date].map((item) => (
                  <View key={item.scheduleId} style={styles.item}>
                    <View style={styles.itemRow}>
                      <Entypo name="clock" size={16} color="#555" />
                      <Text style={styles.time}>
                        {item.startTime} - {item.endTime}
                      </Text>
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    {item.description ? (
                      <Text style={styles.description}>
                        💬 {item.description}
                      </Text>
                    ) : null}
                    {item.location ? (
                      <Text style={styles.location}>📍 {item.location}</Text>
                    ) : null}
                    {item.serviceType ? (
                      <Text style={styles.service}>🏷️ {item.serviceType}</Text>
                    ) : null}
                    {item.estimatedCost != null ? (
                      <Text style={styles.cost}>
                        💰 {item.estimatedCost}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContent: {
    marginBottom: 10,
  },
  dayGroup: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  item: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  time: {
    marginLeft: 6,
    color: "#555",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  description: {
    color: "#444",
  },
  location: {
    marginTop: 2,
    color: "#777",
  },
  service: {
    marginTop: 2,
    color: "#777",
  },
  cost: {
    marginTop: 2,
    color: "#e67e22",
    fontWeight: "600",
  },
});
