import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Swiper from "react-native-swiper";
import useDestination from "../../../hooks/useDestination";

const DestinationScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const { selectedDestination, destinationById, loading, error } =
    useDestination();

  useEffect(() => {
    if (id) {
      destinationById(id);
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

  if (!selectedDestination) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy địa điểm.</Text>
      </View>
    );
  }

  const fallbackImage =
    "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg";
  const desImages = selectedDestination.destinationImages?.length
    ? selectedDestination.destinationImages
    : [fallbackImage];

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Swiper
            style={styles.swiper}
            // showsButtons={true}
            autoplay={true}
            dotColor="#ccc"
            activeDotColor="#000"
          >
            {desImages.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </Swiper>

          <TouchableOpacity style={styles.settingButton}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{selectedDestination?.name}</Text>
          <Text style={styles.subtitle}>
            📍Việt Nam • ⭐ 5.0 - (1289 Ngươi)
          </Text>
          <Text style={styles.description}>
            {selectedDestination?.description}
          </Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Địa điểm</Text>
            <Text style={styles.address}>
              {selectedDestination?.addressLine +
                ", " +
                selectedDestination?.ward +
                ", " +
                selectedDestination?.district +
                ", " +
                selectedDestination?.province}
            </Text>
            <Image
              source={{
                uri: "https://justmaps.com/cdn/shop/products/ComingSoon-LaserCutWoodenMap_ea9246f9-9b19-48dc-9644-29751918889b.jpg?v=1575344472",
              }}
              style={styles.mapImage}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    backgroundColor: "rgba(0, 0, 0 , 0.3)",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
  settingButton: {
    position: "absolute",
    top: 45,
    right: 10,
  },
  headerImage: {
    height: 270,
    justifyContent: "flex-end",
    padding: 20,
  },
  swiper: { height: 350 },
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

export default DestinationScreen;
