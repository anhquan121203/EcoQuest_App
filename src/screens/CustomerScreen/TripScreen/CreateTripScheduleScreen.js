import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import useTrip from "../../../hooks/useTrip";

export default function CreateTripScheduleScreen() {
  const route = useRoute();
  const { selectedDate } = route.params || {};
  const { addNewtripSchedule } = useTrip();

  const allowedStartTime = "08:00";
  const allowedEndTime = "17:00";

  const [scheduleDate, setScheduleDate] = useState(selectedDate || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleSubmit = () => {
    Alert.alert(
      "Tạo lịch trình",
      `Lịch trình đã được tạo cho ngày ${scheduleDate}!`
    );
    // Gắn logic gửi dữ liệu API tại đây
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tạo lịch trình cho chuyến đi</Text>

      <View style={styles.timeInfo}>
        <Text style={styles.label}>Khung giờ cho phép:</Text>
        <Text style={styles.time}>
          {allowedStartTime} - {allowedEndTime}
        </Text>
      </View>

      <Text style={styles.label}>Ngày lịch trình</Text>
      <TextInput
        style={[styles.input, { backgroundColor: "#eee" }]}
        value={scheduleDate}
        editable={false}
      />

      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Nhập mô tả"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Chi phí dự kiến (VNĐ)</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={estimatedCost}
        onChangeText={setEstimatedCost}
      />

      <Text style={styles.label}>Địa điểm</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa điểm"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tạo lịch trình</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  timeInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796b",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
