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
          source={require("../../../../assets/images/home/me_kong.jpg")}
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
          source={require("../../../../assets/images/home/me_kong.jpg")}
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
          source={require("../../../../assets/images/home/me_kong.jpg")}
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
    top: 0,
  },
  
  tabsContainer: {
    marginTop: 70,
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
  
  exploreCard: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    overflow: "hidden",
  },

  exploreImage: {
    width: 120,
    height: 170,
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
