import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import useTrip from "../../../hooks/useTrip";
import { useDispatch } from "react-redux";
import useDestination from "../../../hooks/useDestination";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

export default function CreateTripScreen() {
  const [tripName, setTripName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState(0);
  const [description, setDescription] = useState("");
  const [startingPointAddress, setStartingPointAddress] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [note, setNote] = useState("");

  const [startDate, setStartDate] = useState("2025-06-18");
  const [endDate, setEndDate] = useState("2025-06-20");
  const [rawStartDate, setRawStartDate] = useState(new Date());
  const [rawEndDate, setRawEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleChange = (value) => {
    setDestinationId(value);
  };

  const { addNewtrip } = useTrip();
  const { destinations, fetchDestinations } = useDestination();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // bỏ giờ phút để so sánh chuẩn

      if (selectedDate < today) {
        Toast.show({
          type: "error",
          text1: "⛔ Ngày bắt đầu không hợp lệ",
          text2: "Vui lòng chọn ngày hôm nay hoặc sau.",
        });
        return; // không set state nếu ngày quá khứ
      }

      setRawStartDate(selectedDate);
      setStartDate(formatDate(selectedDate));
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        Toast.show({
          type: "error",
          text1: "⛔ Ngày kết thúc không hợp lệ",
          text2: "Vui lòng chọn ngày hôm nay hoặc sau.",
        });
        return;
      }

      if (selectedDate < rawStartDate) {
        Toast.show({
          type: "error",
          text1: "📅 Ngày kết thúc phải sau ngày bắt đầu",
        });
        return;
      }

      setRawEndDate(selectedDate);
      setEndDate(formatDate(selectedDate));
    }
  };

  const handleCreateTrip = async () => {
    const tripData = {
      tripName,
      startDate,
      endDate,
      numberOfPeople: Number(numberOfPeople),
      totalEstimatedCost: Number(totalEstimatedCost),
      description,
      startingPointAddress,
      destinations: [
        {
          destinationId,
          note,
        },
      ],
    };

    try {
      const result = await addNewtrip(tripData);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "🎉 Tạo chuyến đi thành công!",
          text2: "Chuyến đi của bạn đã được lưu.",
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "❌ Tạo chuyến đi thất bại!",
          text2: "Vui lòng kiểm tra lại thông tin.",
        });

        console.error("Failed to create trip:", result);
      }

      return result;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "😢 Có lỗi xảy ra!",
        text2: "Vui lòng thử lại sau.",
      });

      console.error("Error creating trip:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../../../assets/images/trips/bg-create-trip.jpg")}
          style={styles.headerImage}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Thông tin chuyến đi */}
      <View style={styles.form}>
        <Text style={styles.contentTitle}>Thông tin chuyến đi 🗓️</Text>
        <View style={styles.inputRow}>
          <Ionicons
            name="calendar"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateText}>Bắt đầu: {startDate} - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={{ marginLeft: 10 }}
          >
            <Text style={styles.dateText}>{endDate}</Text>
          </TouchableOpacity>
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={rawStartDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            minimumDate={new Date()} 
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={rawEndDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
            minimumDate={rawStartDate} 
          />
        )}
        <View style={styles.inputRow}>
          <MaterialIcons
            name="travel-explore"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Tên chuyến đi"
            value={tripName}
            onChangeText={setTripName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputRow}>
          <Ionicons name="people" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Số lượng người"
            value={numberOfPeople}
            onChangeText={setNumberOfPeople}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <FontAwesome
            name="money"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Số tiền dự kiến"
            value={totalEstimatedCost}
            onChangeText={setTotalEstimatedCost}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons
            name="description"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Mô tả chuyến đi"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
        </View>
        <View style={styles.inputRow}>
          <EvilIcons
            name="location"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Điểm khởi hành"
            value={startingPointAddress}
            onChangeText={setStartingPointAddress}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Chọn điểm đến:</Text>
          <Picker
            selectedValue={destinationId}
            style={styles.inputRow}
            onValueChange={handleChange}
          >
            {destinations.map((item) => {
              return (
                <Picker.Item
                  key={item.destinationId}
                  label={item.name}
                  value={item.destinationId}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons
            name="description"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Lưu ý"
            value={note}
            onChangeText={setNote}
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Travel with?</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleCreateTrip}>
          <Text style={styles.startButtonText}>Bắt đầu chuyến đi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerImage: {
    height: 250,
    padding: 20,
    justifyContent: "flex-end",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0 , 0.3)",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
  settingButton: {
    position: "absolute",
    top: 40,
    right: 20,
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  form: {
    padding: 20,
    gap: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 15,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "#2979FF",
    borderColor: "#2979FF",
  },
  toggleText: {
    color: "#555",
    fontWeight: "500",
  },
  activeToggleText: {
    color: "#fff",
  },
  startButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
