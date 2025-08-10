import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useTrip from "../../../hooks/useTrip";

export default function TripHistoryScreen() {
  const navigation = useNavigation();
  const { trips, loading, error, fetchTrips } = useTrip();

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleTripDetail = (id) => {
    navigation.navigate("TripDetail", { id });
  };
  let label = "";
  let backgroundColor = "";

  switch (trips.status) {
    case 1:
      label = "Bắt đầu";
      backgroundColor = "#1890ff";
      break;
    case 2:
      label = "Đang đi";
      backgroundColor = "#fadb14";
      break;
    case 3:
      label = "Hoàn thành";
      backgroundColor = "#52c41a";
      break;
    case 4:
      label = "Đã huỷ";
      backgroundColor = "#ff4d4f";
      break;
    default:
      label = "Không xác định";
      backgroundColor = "#d9d9d9";
      break;
  }

  <Text style={[styles.status, { backgroundColor }]}>{label}</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <ImageBackground
          source={require("../../../../assets/images/trips/bg-trip.png")}
          style={styles.headerImage}
        />

        <TouchableOpacity style={styles.settingButton}>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Ongoing Trip */}
        <Text style={styles.sectionTitle}>Ongoing Trip</Text>

        {trips && trips.length > 0 ? (
          trips
            .slice()
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((item, index) => {
              let label = "";
              let backgroundColor = "";

              switch (item.status) {
                case 1:
                  label = "Bắt đầu";
                  backgroundColor = "#1890ff";
                  break;
                case 2:
                  label = "Đang đi";
                  backgroundColor = "#fadb14";
                  break;
                case 3:
                  label = "Hoàn thành";
                  backgroundColor = "#52c41a";
                  break;
                case 4:
                  label = "Đã huỷ";
                  backgroundColor = "#ff4d4f";
                  break;
                default:
                  label = "Không xác định";
                  backgroundColor = "#d9d9d9";
                  break;
              }

              return (
                <TouchableOpacity
                  key={item.tripId}
                  onPress={() => handleTripDetail(item.tripId)}
                >
                  <View style={styles.tripCard} key={index}>
                    <Image
                      source={{
                        uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/4f/7d/fc/caption.jpg?w=1200&h=-1&s=1",
                      }}
                      style={styles.tripImage}
                    />
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripTitle}>{item.tripName}</Text>
                      <View style={styles.tripDetails}>
                        <Ionicons
                          name="location-sharp"
                          size={14}
                          color="#2196F3"
                        />
                        <Text style={styles.locationText}>Thailand</Text>
                      </View>
                      <Text style={styles.dateText}>
                        {item.startDate} - {item.endDate}
                      </Text>
                      <View style={styles.footerCard}>
                        <Text>{item.totalEstimatedCost}</Text>
                        <Text style={[styles.status, { backgroundColor }]}>
                          {label}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
        ) : (
          <Text>Không có chuyến đi</Text>
        )}

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateTrip")}
        >
          <Text style={styles.buttonText}>+ Tạo chuyến đi</Text>
        </TouchableOpacity>

        {/* Past Trips
        <Text style={styles.sectionPastTrip}>Past Trips</Text>
        <View style={styles.pastTrips}>
          {[
            {
              title: "Love Tokyo '18",
              image:
                "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2023/09/fuji-cherry-GettyImages-1060517676-1024x600.jpeg",
              time: "3 months ago",
            },
            {
              title: "London 2018",
              image:
                "https://wallpapercat.com/w/full/3/5/f/292593-3840x2160-desktop-4k-london-wallpaper.jpg",
              time: "6 months ago",
            },
            {
              title: "Santorini 2017",
              image:
                "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pfGVufDB8fDB8fHww",
              time: "2 years ago",
            },
            {
              title: "Busan",
              image:
                "https://wallpapers.com/images/featured/busan-b85vqxi55ve53gk7.jpg",
              time: "2 years ago",
            },
          ].map((trip, index) => (
            <View style={styles.pastTripCard} key={index}>
              <Image
                source={{ uri: trip.image }}
                style={styles.pastTripImage}
              />
              <Text style={styles.pastTripTitle}>{trip.title}</Text>
              <Text style={styles.pastTripDate}>{trip.time}</Text>
            </View>
          ))}
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 300,
    // backgroundColor: "#1976D2",
    padding: 20,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0 , 0.3)",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },

  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
    // width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: "cover",
  },

  location: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  settingButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },

  // content trip******************************************
  scrollContent: {
    marginTop: -35,
    // paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
  },

  tripCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tripImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tripInfo: {
    padding: 12,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#2196F3",
    marginLeft: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#888",
  },
  footerCard: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  status: {
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    overflow: "hidden",
  },

  button: {
    marginHorizontal: 20,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 50,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // past trip******************************************
  sectionPastTrip: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginHorizontal: 20,
  },

  pastTrips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pastTripCard: {
    width: "48%",
    marginTop: 12,
  },
  pastTripImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  pastTripTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
  pastTripDate: {
    fontSize: 12,
    color: "#888",
  },
});
