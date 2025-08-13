import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { logout } from "../../../feartures/auth/authSlice";
import useAuth from "../../../hooks/useAuth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {firstName, lastName, avatar, email, userType} = useAuth();

  const dispatch = useDispatch();


  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token"); 
    await AsyncStorage.removeItem("refresh_token");
    dispatch(logout()); 
  };

  const renderType = (userType) =>  {
    switch (userType) {
      case "1":
        return "Miễn phí";
      default:
        return "Nâng cao";
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      {/* <ImageBackground
        source={{
          uri: "https://letsflytravel.vn/wp-content/uploads/2024/08/nha-trang-2.webp",
        }}
        style={styles.header}
        resizeMode="cover"
      > */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn.dribbble.com/userupload/14028171/file/original-3a31127b9b84f9bc5f75737a4720f699.jpg?resize=752x&vertical=center",
          }} // Replace with your avatar URL
          style={styles.avatar}
        />
        <Text style={styles.name}>{firstName} {lastName}</Text>
        <Text style={styles.phone}>{email}</Text>
        <Text style={styles.phone}>{renderType(userType)}</Text>
      </View>
      {/* </ImageBackground> */}

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Thông tin</Text>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="person" size={24} color="#2a9df4" />
          <Text style={styles.infoText}>Hồ sơ</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#777"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => navigation.navigate("BlogScreen")}
        >
          <Icon name="group" size={24} color="#2a9df4" />
          <Text style={styles.infoText}>Cộng đồng du lịch</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#777"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => navigation.navigate("PaymentHistory")}
        >
          <Icon name="payment" size={24} color="#2a9df4" />
          <Text style={styles.infoText}>Lịch sử thanh toán</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#777"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => handleLogout()}
        >
          <Icon name="logout" size={24} color="#2a9df4" />
          <Text style={styles.infoText}>Đăng xuất</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#777"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#2a9df4",
    alignItems: "center",
    paddingVertical: 30,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    position: "relative",
    height: 350,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  menuIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  phone: {
    fontSize: 16,
    color: "#fff",
  },

  infoContainer: {
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a9df4",
    marginBottom: 20,
  },

  infoItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },

  arrowIcon: {
    marginLeft: "auto",
    color: "#2a9df4",
  },
});

export default ProfileScreen;
