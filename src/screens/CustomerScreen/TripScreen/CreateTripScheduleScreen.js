import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import useTrip from "../../../hooks/useTrip";
import useService from "../../../hooks/useService";

export default function CreateTripScheduleScreen() {
  const route = useRoute();
  const { id, selectedDate } = route.params || {};
  const { addNewtripSchedule } = useTrip();
  const {
    serviceByType,
    selectedService,
    loading: serviceLoading,
    error: serviceError,
  } = useService();

  const [scheduleDate, setScheduleDate] = useState(selectedDate || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [serviceId, setServiceId] = useState("");

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(1); // Default: Hotel

  const allowedStartTime = "08:00";
  const allowedEndTime = "17:00";

  useEffect(() => {
    serviceByType(selectedServiceType);
  }, [selectedServiceType]);

  const formatTime = (date) => {
    if (!date) return "";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleAddNewTripSchedule = async () => {
    if (
      !title ||
      !description ||
      !estimatedCost ||
      !address ||
      !startTime ||
      !endTime
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const payload = {
        tripId: id,
        tripScheduleDetails: [
          {
            scheduleDate,
            title,
            description,
            estimatedCost: parseFloat(estimatedCost),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            address,
            serviceId,
          },
        ],
      };

      await addNewtripSchedule(payload);
      Alert.alert(
        "Thành công",
        `Lịch trình đã được tạo cho ngày ${scheduleDate}!`
      );
    } catch (error) {
      console.error("❌ Error creating schedule:", error);
      Alert.alert("Lỗi", "Không thể tạo lịch trình. Vui lòng thử lại.");
    }
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

      <Text style={styles.label}>Thời gian bắt đầu</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowStartPicker(true)}
      >
        <Text>{startTime ? formatTime(startTime) : "Chọn giờ bắt đầu"}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          mode="time"
          value={startTime || new Date()}
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedTime) => {
            setShowStartPicker(false);
            if (selectedTime) setStartTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>Thời gian kết thúc</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowEndPicker(true)}
      >
        <Text>{endTime ? formatTime(endTime) : "Chọn giờ kết thúc"}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          mode="time"
          value={endTime || new Date()}
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedTime) => {
            setShowEndPicker(false);
            if (selectedTime) setEndTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.label}>Loại dịch vụ</Text>
      <Picker
        selectedValue={selectedServiceType}
        style={styles.inputRow}
        onValueChange={(value) => setSelectedServiceType(value)}
      >
        <Picker.Item label="Khách sạn" value={1} />
        <Picker.Item label="Nhà hàng" value={2} />
        <Picker.Item label="Địa điểm" value={3} />
      </Picker>

      <Text style={styles.label}>Chọn dịch vụ</Text>
      {serviceLoading ? (
        <ActivityIndicator size="small" color="#2196f3" />
      ) : (
        <Picker
          selectedValue={serviceId}
          style={styles.inputRow}
          onValueChange={(value) => setServiceId(value)}
        >
          <Picker.Item label="Chọn dịch vụ" value={null} />
          {selectedService.map((item) => (
            <Picker.Item
              key={item.serviceId}
              label={item.serviceName}
              value={item.serviceId}
            />
            
          ))}
        </Picker>
      )}

      {serviceError && (
        <Text style={{ color: "red", marginTop: 5 }}>
          ❌ Lỗi khi tải dịch vụ: {serviceError}
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddNewTripSchedule}
      >
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
    marginTop: 45,
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
  inputRow: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
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
