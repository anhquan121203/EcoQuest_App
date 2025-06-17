import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";

export default function CreateTripScreen() {
  const [startDate, setStartDate] = useState("09 March");
  const [endDate, setEndDate] = useState("11 March");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [tripName, setTripName] = useState("");
  const [travelWith, setTravelWith] = useState("Party");

  const navigation = useNavigation();

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

      {/* Content ****************************************************/}
      <View style={styles.form}>
        {/* Date */}
        <Text style={styles.contentTitle}>Thông tin chuyến đi 🗓️</Text>
        <View style={styles.inputRow}>
          <Ionicons
            name="calendar"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <Text style={styles.dateText}>
            {startDate} - {endDate}
          </Text>
        </View>

        {/* Budget */}
        <View style={styles.inputRow}>
          <FontAwesome
            name="money"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Budget per day per person"
            value={budget}
            onChangeText={setBudget}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        {/* Interest */}
        <View style={styles.inputRow}>
          <Feather name="heart" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Choose your interest"
            value={interest}
            onChangeText={setInterest}
            style={styles.input}
          />
        </View>

        {/* Trip Name */}
        <TextInput
          placeholder="Trip Name"
          value={tripName}
          onChangeText={setTripName}
          style={[styles.input, { marginLeft: 40 }]}
        />

        {/* Travel With */}
        <Text style={styles.label}>Travel with?</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              travelWith === "Solo" && styles.activeToggle,
            ]}
            onPress={() => setTravelWith("Solo")}
          >
            <Text
              style={[
                styles.toggleText,
                travelWith === "Solo" && styles.activeToggleText,
              ]}
            >
              Solo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              travelWith === "Party" && styles.activeToggle,
            ]}
            onPress={() => setTravelWith("Party")}
          >
            <Text
              style={[
                styles.toggleText,
                travelWith === "Party" && styles.activeToggleText,
              ]}
            >
              Party
            </Text>
          </TouchableOpacity>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>START MY TRIP</Text>
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
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  destination: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  // content******************************************
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    // marginHorizontal: 20,
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
    backgroundColor: "#E0E0E0",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  startButtonText: {
    color: "#999",
    fontWeight: "bold",
  },
});
