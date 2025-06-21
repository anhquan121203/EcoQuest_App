import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useTrip from "../../../hooks/useTrip";
import moment from "moment";

export default function TripScheduleScreen({ navigation }) {
  const [scheduleDates, setScheduleDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const route = useRoute();
  const { id } = route.params;

  const { selectedTrip, tripById, selectedTripSchedule, tripScheduleByTripId } =
    useTrip();

  // Gọi API để lấy trip theo ID
  useEffect(() => {
    if (id) {
      tripById(id);
      tripScheduleByTripId(id);
    }
  }, [id]);

  // Tạo danh sách ngày từ startDate -> endDate
  useEffect(() => {
    if (selectedTrip?.startDate && selectedTrip?.endDate) {
      const list = generateDateList(
        selectedTrip.startDate,
        selectedTrip.endDate
      );
      setScheduleDates(list);
      setSelectedDate(list[0]?.value || "");
    }
  }, [selectedTrip]);

  // Hàm sinh danh sách ngày
  const generateDateList = (startDateStr, endDateStr) => {
    const list = [];

    let current = moment(startDateStr, "DD/MM/YYYY");
    const end = moment(endDateStr, "DD/MM/YYYY");

    while (current.isSameOrBefore(end)) {
      list.push({
        label: current.format("DD-MM"),
        value: current.format("YYYY-MM-DD"),
      });
      current.add(1, "days");
    }

    return list;
  };

  const schedulesForSelectedDate =
    selectedTripSchedule?.filter(
      (item) =>
        moment(item.scheduleDate, "DD/MM/YYYY").format("YYYY-MM-DD") ===
        selectedDate
    ) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch trình {selectedTrip.title}</Text>

      {/* Danh sách ngày */}
      <View style={styles.dateList}>
        {scheduleDates.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.dateItem,
              selectedDate === item.value && styles.dateItemActive,
            ]}
            onPress={() => setSelectedDate(item.value)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === item.value && styles.dateTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách lịch trình tĩnh mẫu */}
      <ScrollView style={{ marginTop: 10 }}>
        {schedulesForSelectedDate.length > 0 ? (
          schedulesForSelectedDate.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.time}>
                {item.startTime} - {item.endTime}
              </Text>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.address}>📍 {item.address}</Text>
              <Text style={styles.cost}>
                Chi phí: {item.estimatedCost} VNĐ
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 10, color: "#666" }}>
            Không có lịch trình cho ngày này.
          </Text>
        )}
      </ScrollView>

      {/* Button tạo mới */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          navigation.navigate("CreateTripSchedule", { selectedDate });
        }}
      >
        <Text style={styles.createText}>Tạo lịch trình mới</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7eafd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 20,
  },
  dateList: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  dateItem: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    width: 60,
  },
  dateItemActive: {
    backgroundColor: "#6200ee",
  },
  dateText: {
    textAlign: "center",
    color: "#333",
  },
  dateTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  time: {
    fontWeight: "bold",
    color: "#000",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  desc: {
    color: "#666",
  },
  address: {
    color: "#333",
    marginTop: 5,
  },
  cost: {
    color: "red",
    marginTop: 5,
    fontWeight: "600",
  },
  tag: {
    backgroundColor: "#b2ebf2",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 5,
  },
  tagText: {
    color: "#00796b",
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  createText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
