import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function TripHistoryScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header cố định */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://media.istockphoto.com/id/506935861/photo/rice-field-and-river-in-ninhbinh-vietnam.jpg?s=612x612&w=0&k=20&c=rMf0d5A0DI0HsqYwFtlaUhiXaCCIYuZzQ8v7l-QEKqk=",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Nội dung cuộn */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {[...Array(3)].map((_, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: "https://transviet.com.vn/images/Khuyen-Mai/Pictures/cam_nang_du_lich/LUU-Y-KHI-DI-DU-LICH/dulichtheotour-transviet00.jpg",
                  }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardTitle}>Du lịch theo tour</Text>
                <Text style={styles.cardSubtitle}>
                  2 ngày/1 đêm - 3.000.000 VNĐ
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.buttonCreateTrip} onPress={() => navigation.navigate("Schedule")}>
          
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Tạo lịch trình mới
            </Text>
          
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const HEADER_HEIGHT = 320;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // header
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
  },

  image: {
    width: "100%",
    height: HEADER_HEIGHT,
  },

  //   scroll content
  scrollContent: {
    paddingTop: HEADER_HEIGHT,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fcff",
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  card: {
    marginBottom: 10,
    width: 350,
    height: 300,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 8,
    marginTop: 6,
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    paddingHorizontal: 8,
    marginBottom: 10,
  },

  buttonCreateTrip: {
    backgroundColor: "#2a9df4",
    // paddingVertical: 14,
    borderRadius: 10,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});
