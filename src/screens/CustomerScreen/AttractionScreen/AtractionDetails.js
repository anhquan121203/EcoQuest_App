import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import useAttraction from "../../../hooks/useAttraction";

const AtractionDetails = () => {
  const route = useRoute();
  const {id} = route.params;

  const { selectedAttraction, attractionById, loading, error } =
    useAttraction();


  useEffect(() => {
    if (id) {
      attractionById(id);
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

  if (!selectedAttraction) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy địa điểm.</Text>
      </View>
    );
  }

  const imageUrl =
    selectedAttraction.attractionImages?.[0] ??
    "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: "https://cdn.xanhsm.com/2024/11/aa4af80d-ho-hoan-kiem-2.jpg" }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{selectedAttraction?.attractionName}</Text>
          <Text style={styles.subtitle}>
            📍 Nhà Nơi, Việt Nam • ⭐ 5.0 - (1289 Ngươi)
          </Text>
          <Text style={styles.description}>
            {selectedAttraction?.attractionType}
          </Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Địa điểm</Text>
            <Text style={styles.mapName}>{selectedAttraction.address}</Text>
            <Image
              source={{ uri: "https://example.com/map-image.jpg" }}
              style={styles.mapImage}
            />
            <Text style={styles.address}>
              Tầng l, Khách sạn JW Marriott, Số 8 Đỗ Đức Dục, Nam Từ Liêm, Hà
              Nội
            </Text>
            <Text style={styles.distance}>Điếm đến gần nhất</Text>
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
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 350 },
  content: { padding: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#555", marginVertical: 5 },
  description: { fontSize: 14, color: "#666", marginBottom: 10 },
  mapContainer: { marginTop: 10 },
  mapTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  mapImage: { width: "100%", height: 150, marginBottom: 5 },
  address: { fontSize: 14, color: "#666" },
  distance: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  distanceItem: { fontSize: 14, color: "#666" },
});

export default AtractionDetails;
