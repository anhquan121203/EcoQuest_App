import { useNavigation, useRoute } from "@react-navigation/native";
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
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import moment from "moment";
import useHotel from "../../../hooks/useHotel";

export default function CreateTripScheduleScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, selectedDate, startDate, endDate } = route.params || {};
  const { addNewtripSchedule, tripScheduleByTripId, fetchTrips, trips } =
    useTrip();
  const {
    serviceByType,
    selectedService,
    loading: serviceLoading,
  } = useService();
  const { rooms, fetchRoomsByHotel, loading } = useHotel();

  // giữ scheduleDate dạng Date object
  const [scheduleDate, setScheduleDate] = useState(
    selectedDate ? moment(selectedDate, "YYYY-MM-DD").toDate() : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [tripSchedules, setTripSchedules] = useState([]);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const allowedStartTime = "00:00";
  const allowedEndTime = "23:00";

  useEffect(() => {
    serviceByType(selectedServiceType);
    setServiceId("");
  }, [selectedServiceType]);

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    if (id) {
      tripScheduleByTripId(id);
    }
  }, [id]);

  const handleSelectService = (value) => {
    setServiceId(value);
    if (selectedServiceType === 1 && value) {
      fetchRoomsByHotel(value);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // ✅ Thêm lịch trình vào danh sách tạm
  const handleAddScheduleToList = () => {
    if (
      !title ||
      !description ||
      !estimatedCost ||
      !address ||
      !startTime ||
      !endTime ||
      !scheduleDate
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Validate ngày nằm trong khoảng chuyến đi
    if (
      moment(scheduleDate).isBefore(moment(startDate, "DD/MM/YYYY"), "day") ||
      moment(scheduleDate).isAfter(moment(endDate, "DD/MM/YYYY"), "day")
    ) {
      Alert.alert("Lỗi", "Ngày lịch trình phải nằm trong thời gian chuyến đi.");
      return;
    }

    const newSchedule = {
      scheduleDate: moment(scheduleDate).format("YYYY-MM-DD"), // format BE
      title,
      description,
      estimatedCost: parseFloat(estimatedCost),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      address,
      serviceId,
    };

    setTripSchedules((prev) => [...prev, newSchedule]);

    // Reset form sau khi thêm
    setTitle("");
    setDescription("");
    setEstimatedCost("");
    setAddress("");
    setStartTime(null);
    setEndTime(null);
    setServiceId("");

    Toast.show({
      type: "success",
      text1: "Đã thêm lịch trình vào danh sách",
    });
  };

  // ✅ Gửi toàn bộ lịch trình về BE
  const handleSubmitAllSchedules = async () => {
    if (tripSchedules.length === 0) {
      Toast.show({
        type: "error",
        text1: "Lỗi!",
        text2: `Bạn chưa thêm lịch trình nào!`,
      });
      return;
    }

    try {
      const payload = {
        tripId: id,
        tripScheduleDetails: tripSchedules.map((sch) => ({
          scheduleDate: sch.scheduleDate, // đã format YYYY-MM-DD
          title: sch.title,
          description: sch.description,
          startTime: sch.startTime,
          endTime: sch.endTime,
          address: sch.address,
          estimatedCost: parseFloat(sch.estimatedCost),
          ...(sch.serviceId ? { serviceId: sch.serviceId } : {}),
        })),
      };

      console.log("Payload gửi về Tạo lịch trình:", payload);

      const res = await addNewtripSchedule(payload);
      console.log("object", res);

      await tripScheduleByTripId(id);

      Toast.show({
        type: "success",
        text1: "Thành công!",
        text2: `${tripSchedules.length} lịch trình đã được tạo!`,
      });

      navigation.goBack();
    } catch (error) {
      console.error("❌ Error creating schedule:", error);
      Toast.show({
        type: "error",
        text1: "Không thể tạo lịch trình",
      });
    }
  };

  // Lọc danh sách theo destinationId
  const trip = trips.find((t) => t.tripId === id);
  const destinationIds = trip?.destinations?.map((d) => d.destinationId) || [];

  const filteredServices = React.useMemo(() => {
    return selectedService.filter((service) =>
      destinationIds.includes(service.destinationId)
    );
  }, [selectedService, destinationIds]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Tạo lịch trình cho chuyến đi</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.timeInfo}>
        <Text style={styles.label}>Khung giờ cho phép:</Text>
        <Text style={styles.time}>
          {allowedStartTime} - {allowedEndTime}
        </Text>
      </View>

      {/* Ngày lịch trình */}
      <Text style={styles.label}>Ngày lịch trình</Text>
      <TouchableOpacity
        style={[styles.input, { justifyContent: "center" }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>
          {scheduleDate
            ? moment(scheduleDate).format("DD/MM/YYYY")
            : "Chọn ngày"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={scheduleDate || moment(startDate, "DD/MM/YYYY").toDate()}
          minimumDate={moment(startDate, "DD/MM/YYYY").toDate()}
          maximumDate={moment(endDate, "DD/MM/YYYY").toDate()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) {
              setScheduleDate(date); // giữ Date object
            }
          }}
        />
      )}

      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
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

      {/* Thời gian bắt đầu */}
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

      {/* Thời gian kết thúc */}
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

      {/* Loại dịch vụ */}
      <Text style={styles.label}>Loại dịch vụ</Text>
      <Picker
        selectedValue={selectedServiceType}
        style={styles.inputRow}
        onValueChange={(value) => setSelectedServiceType(Number(value))}
      >
        <Picker.Item label="Khách sạn" value={1} />
        <Picker.Item label="Nhà hàng" value={2} />
        <Picker.Item label="Địa điểm" value={3} />
      </Picker>

      <Text style={styles.label}>
        {selectedServiceType === 1 ? "Chọn khách sạn" : "Chọn dịch vụ"}
      </Text>

      {serviceLoading ? (
        <ActivityIndicator size="small" color="#2196f3" />
      ) : (
        <>
          <Picker
            selectedValue={serviceId}
            style={styles.inputRow}
            onValueChange={handleSelectService}
          >
            <Picker.Item
              label={
                selectedServiceType === 1 ? "Chọn khách sạn" : "Chọn dịch vụ"
              }
              value={""}
            />
            {filteredServices.map((item) => (
              <Picker.Item
                key={item.serviceId}
                label={item.serviceName}
                value={item.serviceId}
              />
            ))}
          </Picker>

          {/* Hiển thị chi tiết dịch vụ hoặc khách sạn */}
          {serviceId && (
            <View
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#f1f1f1",
                borderRadius: 8,
              }}
            >
              {selectedService
                .filter((item) => item.serviceId === serviceId)
                .map((item) => (
                  <View key={item.serviceId}>
                    <Text style={styles.label}>
                      {selectedServiceType === 1
                        ? "Tên khách sạn:"
                        : "Tên dịch vụ:"}
                    </Text>
                    <Text>{item.serviceName}</Text>

                    <Text style={styles.label}>Địa chỉ:</Text>
                    <Text>{item.address}</Text>

                    <Text style={styles.label}>Chi phí:</Text>
                    <Text>{item.cost} VNĐ</Text>
                  </View>
                ))}
            </View>
          )}

          {/* Nếu là khách sạn thì show rooms */}
          {selectedServiceType === 1 && rooms.length > 0 ? (
            rooms.map((room) => (
              <TouchableOpacity
                key={room.roomId}
                style={{
                  padding: 8,
                  marginVertical: 5,
                  borderWidth: 1,
                  borderColor:
                    selectedRoomId === room.roomId ? "#2196f3" : "#ccc",
                  borderRadius: 6,
                  backgroundColor:
                    selectedRoomId === room.roomId ? "#e3f2fd" : "#fff",
                }}
                onPress={() => {
                  setSelectedRoomId(room.roomId);
                  setServiceId(room.roomId); // ✅ gửi roomId về BE
                }}
              >
                <Text>Phòng: {room.roomType}</Text>
                <Text>Số người: {room.maxGuests}</Text>
                <Text>Giá: {room.pricePerNight} VNĐ</Text>
              </TouchableOpacity>
            ))
          ) : selectedServiceType === 1 ? (
            <Text>Chưa có phòng nào.</Text>
          ) : null}
        </>
      )}

      {/* Nút thêm vào danh sách */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={handleAddScheduleToList}
      >
        <Text style={styles.buttonText}>Thêm vào danh sách</Text>
      </TouchableOpacity>

      {/* Danh sách tạm */}
      {tripSchedules.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            📋 Danh sách lịch trình tạm:
          </Text>
          {tripSchedules.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#f1f1f1",
                padding: 10,
                marginBottom: 5,
                borderRadius: 8,
              }}
            >
              <Text>
                {index + 1}. {item.title} - {item.scheduleDate}
              </Text>
              <Text>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Nút gửi về BE */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleSubmitAllSchedules}
      >
        <Text style={styles.buttonText}>📤 Tạo lịch trình</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 0,
    backgroundColor: "rgba(0, 0, 0 , 0.3)",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
  settingButton: {
    position: "absolute",
    top: 15,
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    marginTop: 20,
  },
  timeInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginTop: 20,
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
