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
import { useSelector } from "react-redux";
import useAttraction from "../../../hooks/useAttraction";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Swiper from "react-native-swiper";
import MapView, { Marker } from "react-native-maps";

const AtractionDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

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

  const fallbackImage =
    "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg";
  const attracImages = selectedAttraction.attractionImages?.length
    ? selectedAttraction.attractionImages
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

          {/* <ImageBackground
            source={require("../../../../assets/images/trips/image_trip_detail.jpg")}
            style={styles.headerImage}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          ></ImageBackground> */}
          <Swiper
            style={styles.swiper}
            // showsButtons={true}
            autoplay={true}
            dotColor="#ccc"
            activeDotColor="#000"
          >
            {attracImages.map((img, index) => (
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
          <Text style={styles.title}>{selectedAttraction?.attractionName}</Text>
          <Text style={styles.subtitle}>
            📍{selectedAttraction.address}
          </Text>
          <Text style={styles.description}>
            {selectedAttraction?.attractionType}
          </Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Địa điểm</Text>
            <Text style={{fontSize: 15}}>{selectedAttraction.address}</Text>

            <Text styles={{ marginTop: 5, marginBottom: 5 }}>
              Thôn An Sơn, Hòa Vang, Đà Nẵng, Việt Nam
            </Text>
          </View>
          <MapView
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE} // ⚡ bắt buộc nếu muốn Google Maps
            initialRegion={{
              latitude: 15.997,
              longitude: 107.9884,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: 15.997,
                longitude: 107.9884,
              }}
              title="Bà Nà Hills"
              description="Sun World Bà Nà Hills, Đà Nẵng"
            />
          </MapView>

          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Địa điểm gần nhất</Text>
            <Text style={styles.mapName}>
              Chùa Linh Ứng Bà Nà - ngay trong khu du lịch.
            </Text>
            <Text style={styles.mapName}>
              Cầu Vàng (Golden Bridge) - cách cáp treo khoảng 1 km
            </Text>
            <Text style={styles.mapName}>
              Fantasy Park - khu vui chơi trong nhà tại Bà Nà Hills.
            </Text>
            
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
  address: { fontSize: 14, color: "#666", marginBottom: 10 },
  distance: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  distanceItem: { fontSize: 14, color: "#666" },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  mapName: {
    fontSize: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default AtractionDetails;
