import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Button } from "react-native-paper";

const dateFormat = "YYYY/MM/DD";

export default function TripScheduleAiScreen() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [foodService, setFoodService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [budget, setBudget] = useState("");

  const [startDate, setStartDate] = useState(
    dayjs("2015/01/01", dateFormat).toDate()
  );
  const [endDate, setEndDate] = useState(
    dayjs("2015/01/01", dateFormat).toDate()
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.title}>Chọn lịch trình của bạn 🧳</Text>

      {/* Thông tin chuyến đi */}
      <Text style={styles.section}>Thông tin chuyến đi</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Nơi muốn du lịch..."
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Start Date - End Date ***************************************************/}
      <View >
        <Text variant="titleMedium" style={styles.section}>
          Chọn khoảng ngày:
        </Text>

        <Button
          mode="outlined"
          icon="calendar"
          onPress={() => setShowStartPicker(true)}
          style={{ marginBottom: 10 }}
        >
          Ngày bắt đầu: {dayjs(startDate).format(dateFormat)}
        </Button>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartChange}
          />
        )}

        <Button
          mode="outlined"
          icon="calendar"
          onPress={() => setShowEndPicker(true)}
          style={{ marginBottom: 10 }}
        >
          Ngày kết thúc: {dayjs(endDate).format(dateFormat)}
        </Button>

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            minimumDate={startDate}
            onChange={handleEndChange}
          />
        )}
      </View>

      {/* Nhóm tham gia */}
      <Text style={styles.section}>Chi tiết nhóm tham gia</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="people-outline" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Số lượng người tham gia..."
          style={styles.input}
          value={groupSize}
          onChangeText={setGroupSize}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="feedback" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Yêu cầu đặc biệt (VD: ăn chay...)"
          style={styles.input}
          value={specialRequest}
          onChangeText={setSpecialRequest}
        />
      </View>

      {/* Dịch vụ bổ sung */}
      <Text style={styles.section}>Dịch vụ bổ sung</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="utensils" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Thêm dịch vụ ăn uống"
          style={styles.input}
          value={foodService}
          onChangeText={setFoodService}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="construct-outline" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Dịch vụ khác"
          style={styles.input}
          value={otherService}
          onChangeText={setOtherService}
        />
      </View>

      {/* Chi phí dự phòng */}
      <Text style={styles.section}>Chi phí dự phòng</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="wallet-outline" size={20} color="#2a9df4" />
        <TextInput
          placeholder="Chi phí dự trù"
          style={styles.input}
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
      </View>

      {/* Nút tính toán */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tính toán chuyến đi</Text>
      </TouchableOpacity>
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

  section: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 6,
    color: "#444",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a9df4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },

  button: {
    marginTop: 24,
    backgroundColor: "#2a9df4",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
