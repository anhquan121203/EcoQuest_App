import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import useAttraction from "../../hooks/useAttraction";
import { useNavigation } from "@react-navigation/native";
import useHotel from "../../hooks/useHotel";
import useLocation from "../../hooks/useLocation";
import Ionicons from "react-native-vector-icons/Ionicons";
import useDestination from "../../hooks/useDestination";

const HomeScreen = () => {
  const { attractions, loading, error, fetchAttractions } = useAttraction();
  const { addressNow } = useLocation();
  const { hotels, fetchHotels } = useHotel();
  const { destinations, fetchDestinations } = useDestination();


  const navigation = useNavigation();

  useEffect(() => {
    fetchAttractions();
    fetchHotels();
    fetchDestinations();
  }, []);

  const handleAttractionDetails = (id) => {
    navigation.navigate("AttractionDetails", { id });
  };

  const handleHotelDetails = (id) => {
    navigation.navigate("HotelDetails", { id });
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView style={styles.container}>
        {/* Vị trí hiện tại */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            <Text style={{ color: "#FF6C00" }}>{addressNow}</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.bell}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Chào người dùng */}
        <View style={styles.greeting}>
          <Text style={styles.helloText}>
            Xin chào, <Text style={{ fontWeight: "bold" }}>Ecoquest 👋</Text>
          </Text>
          <Text style={styles.subText}>
            Chúng ta hãy cùng{" "}
            <Text style={styles.highlight}>khám phá nhé!</Text>
          </Text>
        </View>

        {/* tìm kiếm */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Bạn muốn đi đâu?"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* Tabs chủ đề */}
        <View style={styles.tabsContainer}>
          <Text style={styles.sectionTitle}>Khám phá đất nước</Text>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </View>
        <View style={styles.tabList}>
          {["Tự nhiên", "Biển", "Núi", "Phố cổ"].map((tab, index) => (
            <View
              key={index}
              style={[styles.tabItem, index === 0 && styles.activeTab]}
            >
              <Text style={index === 0 ? styles.activeTabText : styles.tabText}>
                {tab}
              </Text>
            </View>
          ))}
        </View>

        {/* Danh sách địa điểm nổi bật */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardScroll}
        >
          {attractions && attractions?.length > 0 ? (
            attractions.map((item, index) => {
              const imageUrl =
                item.attractionImages?.length > 0
                  ? item.attractionImages[0]
                  : "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg";

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAttractionDetails(item.attractionId)}
                >
                  <View key={index} style={styles.card}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{item.attractionName}</Text>
                    <Text style={styles.cardSubtitle}>
                      {item.attractionType} mỗi người
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Đã xảy ra lỗi: {error}</Text>
          ) : (
            <Text>Không có địa điểm nào để hiển thị.</Text>
          )}
        </ScrollView>

        {/* TAB KHÁCH SẠN */}
        <View style={styles.tabsContainer}>
          <Text style={styles.sectionTitle}>Lựa chọn cho phút chót</Text>
          <Text
            style={styles.seeMore}
            onPress={() => navigation.navigate("HotelMore")}
          >
            Xem thêm
          </Text>
        </View>

        {/* Danh sách khách sạn nổi bật */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardScroll}
        >
          {hotels && hotels?.length > 0 ? (
            hotels.map((item, index) => {
              const imageUrl =
                item.hotelImages?.length > 0
                  ? item.hotelImages[0]
                  : "https://via.placeholder.com/160x100.png?text=No+Image";

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleHotelDetails(item.hotelId)}
                >
                  <View key={index} style={styles.card}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSubtitle}>
                      {item.addressLine} mỗi người
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Đã xảy ra lỗi: {error}</Text>
          ) : (
            <Text>Không có địa điểm nào để hiển thị.</Text>
          )}
        </ScrollView>

        {/* Gợi ý điểm đến */}
        <View style={styles.tabsContainer}>
          <Text style={styles.sectionTitle}>Khám phá</Text>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </View>

        {destinations && destinations?.length > 2 ? (
          destinations.slice(0, 5).map((item, index) => {
            const imageUrl =
              item.destinationImages?.length > 0
                ? item.destinationImages[0]
                : "https://via.placeholder.com/120x100.png?text=No+Image";

            return (
              <TouchableOpacity style={styles.exploreCard} key={index}>
                <Image source={{ uri: imageUrl }} style={styles.exploreImage} />
                <View style={styles.exploreInfo}>
                  <Text style={styles.exploreTitle}>{item.name}</Text>
                  <Text style={styles.exploreSubtitle}>
                    {" "}
                    {item.description}
                  </Text>
                  <Text style={styles.exploreDate}></Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Không có điểm đến nào để hiển thị.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate("ChatbotScreen")}
      >
        <Image
          source={require("../../../assets/chatbot.png")}
          style={styles.chatbotIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    top: 0,
  },

  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    alignItems: "center",
  },

  locationText: {
    fontSize: 20,
    color: "#444",
  },

  bell: {
    fontSize: 18,
  },
  greeting: {
    marginTop: 20,
  },
  helloText: {
    fontSize: 16,
    color: "#000",
  },
  subText: {
    fontSize: 16,
    marginTop: 4,
  },
  highlight: {
    color: "#FF9900",
    fontWeight: "600",
  },
  searchBox: {
    marginTop: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  tabsContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeMore: {
    fontSize: 14,
    color: "#007AFF",
  },
  tabList: {
    flexDirection: "row",
    marginTop: 12,
  },
  tabItem: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "500",
  },

  cardScroll: {
    marginTop: 16,
  },

  card: {
    marginRight: 14,
    marginBottom: 10,
    width: 160,
    height: 200,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  cardImage: {
    width: "100%",
    height: 100,
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
  exploreCard: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    overflow: "hidden",
  },
  exploreImage: {
    width: 120,
    height: 100,
  },
  exploreInfo: {
    flex: 1,
    padding: 10,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  exploreSubtitle: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  exploreDate: {
    fontSize: 12,
    color: "#FF6C00",
  },

  chatbotButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },

  chatbotIcon: {
    width: 30,
    height: 30,
  },
});
