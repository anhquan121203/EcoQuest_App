import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const AtractionDetails = () => {
  return (
    <ScrollView style={styles.container}>
    <View >
      <Image
        source={require("../../../assets/images/home/mekong.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Nhà hàng JW Cafe</Text>
        <Text style={styles.subtitle}>
          📍 Nhà Nơi, Việt Nam • ⭐ 5.0 - (1289 Ngươi)
        </Text>
        <Text style={styles.description}>
          Khách sạn JW Marriott nổi tiếng là nơi trong nhà hàng JW sang trọng
          với thực đơn đa dạng. Cựu Tổng thống Mỹ Obama từng chọn là địa điểm
          nghỉ chân trong chuyến công tác tại Hà Nội.
        </Text>
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>Địa điểm</Text>
          <Image
            source={{ uri: "https://example.com/map-image.jpg" }}
            style={styles.mapImage}
          />
          <Text style={styles.address}>
            Tầng l, Khách sạn JW Marriott, Số 8 Đỗ Đức Dục, Nam Từ Liêm, Hà Nội
          </Text>
          <Text style={styles.distance}>Điếm đến gần nhất</Text>
          <Text style={styles.distanceItem}>⛳ Lăng Bác - 2.7 km</Text>
          <Text style={styles.distanceItem}>🏛 Nhà hát Lớn Hà Nội - 4.7 km</Text>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 400 },
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
