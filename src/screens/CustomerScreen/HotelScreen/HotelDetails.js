import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import useHotel from "../../../hooks/useHotel";

import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import useStreetMap from "../../../hooks/useStreetMap";

const HotelDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const { selectedHotel, hotelById, loading, error } = useHotel();
  const address = selectedHotel?.address;
  const { coordinates } = useStreetMap(address);



  useEffect(() => {
    if (id) {
      hotelById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }

  if (!selectedHotel) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy địa điểm.</Text>
      </View>
    );
  }

  const fallbackImage = "https://via.placeholder.com/300x200.png?text=No+Image";
  const hotelImages = selectedHotel.hotelImages?.length
    ? selectedHotel.hotelImages
    : [fallbackImage];

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text>🔙</Text>
          </TouchableOpacity>

          <Swiper
            style={styles.swiper}
            // showsButtons={true}
            autoplay={true}
            dotColor="#ccc"
            activeDotColor="#000"
          >
            {hotelImages.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </Swiper>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{selectedHotel?.hotelName}</Text>
          <Text style={styles.subtitle}>
            📍 Nhà Nơi, Việt Nam • ⭐ 5.0 - (1289 Ngươi)
          </Text>
          <Text style={styles.description}>{selectedHotel?.description}</Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Địa điểm</Text>
            <Text style={styles.mapName}>{selectedHotel.address}</Text>

            <Text style={styles.mapTitle}>Bản đồ</Text>

            {coordinates ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  ...coordinates,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={coordinates}
                  title={selectedHotel.hotelName}
                  description={selectedHotel.address}
                />
              </MapView>
            ) : (
              <Text style={{ color: "#999", fontStyle: "italic" }}>
                Không thể hiển thị bản đồ.
              </Text>
            )}

            <Text style={styles.distance}>Điểm đến gần nhất</Text>
            <Text style={styles.distanceItem}>⛳ Lăng Bác - 2.7 km</Text>
            <Text style={styles.distanceItem}>
              🏛 Nhà hát Lớn Hà Nội - 4.7 km
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginBottom: 10 },

  // header
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    cursor: "pointer",
  },

  swiper: { height: 350 },

  image: { width: "100%", height: 350 },

  content: { padding: 10 },

  title: { fontSize: 24, fontWeight: "bold" },

  subtitle: { fontSize: 16, color: "#555", marginVertical: 5 },

  description: { fontSize: 14, color: "#666", marginBottom: 10 },

  mapContainer: { marginTop: 10 },

  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  mapImage: {
    width: "100%",
    height: 150,
    marginBottom: 5,
  },

  address: {
    fontSize: 14,
    color: "#666",
  },

  distance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  distanceItem: {
    fontSize: 14,
    color: "#666",
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default HotelDetails;
