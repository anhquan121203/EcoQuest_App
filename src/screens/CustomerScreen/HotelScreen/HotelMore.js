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


const HotelMore = () => {
    const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Gợi ý khách sạn */}
      <View style={styles.tabsContainer}>
        <Text style={styles.sectionTitle}>Khám phá</Text>
        <Text style={styles.seeMore}>Xem thêm</Text>
      </View>

      <TouchableOpacity
        style={styles.exploreCard}
        onPress={() => navigation.navigate("AttractionDetails")}
      >
        <Image
          source={require("../../../../assets/images/home/mekong.png")}
          style={styles.exploreImage}
        />
        <View style={styles.exploreInfo}>
          <Text style={styles.exploreTitle}>Chợ nổi Miền Tây</Text>
          <Text style={styles.exploreSubtitle}>
            Cà Mau · Thiên nhiên · Nắng đẹp
          </Text>
          <Text style={styles.exploreDate}>Từ: 8 tháng 3 - 15 tháng 3</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.exploreCard}>
        <Image
          source={require("../../../../assets/images/home/mekong.png")}
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
          source={require("../../../../assets/images/home/mekong.png")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    top: 100,
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

export default HotelMore;
