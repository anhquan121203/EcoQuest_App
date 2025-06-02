import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Vị trí hiện tại */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          📍 <Text style={{ color: "#FF6C00" }}>Ha Noi, Viet Nam</Text>
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
          Chúng ta hãy cùng <Text style={styles.highlight}>khám phá nhé!</Text>
        </Text>
      </View>

      {/* Ô tìm kiếm */}
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
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/home/ho-guom.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Hồ Gươm</Text>
          <Text style={styles.cardSubtitle}>215k mỗi người</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/home/sapa.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sapa</Text>
          <Text style={styles.cardSubtitle}>450k mỗi người</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/home/sapa.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sapa</Text>
          <Text style={styles.cardSubtitle}>450k mỗi người</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/home/sapa.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sapa</Text>
          <Text style={styles.cardSubtitle}>450k mỗi người</Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../../assets/images/home/sapa.jpg")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Sapa</Text>
          <Text style={styles.cardSubtitle}>450k mỗi người</Text>
        </View>
      </ScrollView>

      {/* Gợi ý khám phá */}
      <View style={styles.tabsContainer}>
        <Text style={styles.sectionTitle}>Khám phá</Text>
        <Text style={styles.seeMore}>Xem thêm</Text>
      </View>

      <View style={styles.exploreCard}>
        <Image
          source={require("../../../assets/images/home/mekong.png")}
          style={styles.exploreImage}
        />
        <View style={styles.exploreInfo}>
          <Text style={styles.exploreTitle}>Chợ nổi Miền Tây</Text>
          <Text style={styles.exploreSubtitle}>
            Cà Mau · Thiên nhiên · Nắng đẹp
          </Text>
          <Text style={styles.exploreDate}>Từ: 8 tháng 3 - 15 tháng 3</Text>
        </View>
      </View>
      <View style={styles.exploreCard}>
        <Image
          source={require("../../../assets/images/home/mekong.png")}
          style={styles.exploreImage}
        />
        <View style={styles.exploreInfo}>
          <Text style={styles.exploreTitle}>Chợ nổi Miền Tây</Text>
          <Text style={styles.exploreSubtitle}>
            Cà Mau · Thiên nhiên · Nắng đẹp
          </Text>
          <Text style={styles.exploreDate}>Từ: 8 tháng 3 - 15 tháng 3</Text>
        </View>
      </View>
      <View style={styles.exploreCard}>
        <Image
          source={require("../../../assets/images/home/mekong.png")}
          style={styles.exploreImage}
        />
        <View style={styles.exploreInfo}>
          <Text style={styles.exploreTitle}>Chợ nổi Miền Tây</Text>
          <Text style={styles.exploreSubtitle}>
            Cà Mau · Thiên nhiên · Nắng đẹp
          </Text>
          <Text style={styles.exploreDate}>Từ: 8 tháng 3 - 15 tháng 3</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    top: 0,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
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
    width: 160,
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
});
