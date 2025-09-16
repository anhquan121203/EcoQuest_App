import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import useTrip from "../../../hooks/useTrip";

export default function UpdateTripScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateTripById } = useTrip();

  // Lấy dữ liệu chuyến đi từ params
  const { trip } = route.params;

  const [form, setForm] = useState({
    tripId: trip.tripId,
    tripName: trip.tripName || "",
    startDate: trip.startDate || "",
    endDate: trip.endDate || "",
    numberOfPeople: trip.numberOfPeople?.toString() || "",
    totalEstimatedCost: trip.totalEstimatedCost?.toString() || "",
    description: trip.description || "",
    status: trip.status ?? 0,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      numberOfPeople: parseInt(form.numberOfPeople, 10),
      totalEstimatedCost: parseFloat(form.totalEstimatedCost),
    };

    const result = await updateTripById(payload);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Cập nhật thành công!",
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: "error",
        text1: "Cập nhật thất bại",
        text2: "Vui lòng thử lại",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Tên chuyến đi</Text>
      <TextInput
        style={styles.input}
        value={form.tripName}
        onChangeText={(text) => handleChange("tripName", text)}
      />

      <Text style={styles.label}>Ngày bắt đầu</Text>
      <TextInput
        style={styles.input}
        value={form.startDate}
        placeholder="YYYY-MM-DD"
        onChangeText={(text) => handleChange("startDate", text)}
      />

      <Text style={styles.label}>Ngày kết thúc</Text>
      <TextInput
        style={styles.input}
        value={form.endDate}
        placeholder="YYYY-MM-DD"
        onChangeText={(text) => handleChange("endDate", text)}
      />

      <Text style={styles.label}>Số người</Text>
      <TextInput
        style={styles.input}
        value={form.numberOfPeople}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("numberOfPeople", text)}
      />

      <Text style={styles.label}>Chi phí dự kiến</Text>
      <TextInput
        style={styles.input}
        value={form.totalEstimatedCost}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("totalEstimatedCost", text)}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={form.description}
        multiline
        onChangeText={(text) => handleChange("description", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fc",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#00b894",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
