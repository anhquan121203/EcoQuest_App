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
import { Ionicons, Feather } from "@expo/vector-icons";
import useBlog from "../../../hooks/useBlog";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function BlogScreen() {
  const { blogs, loading, error, fetchBlogs } = useBlog();
  const navigation = useNavigation();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogDetail = (id) => {
    navigation.navigate("BlogDetail", {id})
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={styles.iconHeader}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Blogger</Text>
        </View>

        <FontAwesome
          name="pencil-square-o"
          size={24}
          color="black"
          onPress={() => navigation.navigate("PostBlogScreen")}
        />
      </View>
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput placeholder="Tìm kiếm blogger?" style={styles.searchInput} />
        <Feather name="filter" size={20} color="#555" />
      </View>

      {/* Section: Bài viết gần đây */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bài viết gần đây</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bài viết ************************************************************************* */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {blogs && blogs?.length > 0 ? (
          blogs.map((item, index) => {
            const imageUrl =
              item.blogImages?.length > 0
                ? item.blogImages[0]
                : "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png";

            return (
              <View style={styles.card} key={index} >
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />

                <View style={styles.durationTag}>
                  <Text style={styles.durationText}>{item.createdAt}</Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc} numberOfLines={4}>
                    {item.content}
                  </Text>
                  <Text style={styles.cardLink} onPress={() => handleBlogDetail(item.blogId)}>Xem chi tiết</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.card}>
            <Text>Không có bài viết</Text>
          </View>
        )}

        {/* Lặp thêm bài viết nếu cần */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 10,
    position: "relative", 
  },
  backButton: {
    position: "absolute", 
    left: 0,
    zIndex: 1,
  },

  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 30,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewAll: {
    fontSize: 14,
    color: "#FF6600",
  },

  scrollContent: {
    marginTop: 10,
    paddingBottom: 100,
  },

  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  durationTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF0000",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    color: "#fff",
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  cardLink: {
    color: "#FF6600",
    marginTop: 6,
    fontWeight: "600",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: "#FFA500",
    marginTop: 2,
  },
  navCenter: {
    backgroundColor: "#FFA500",
    padding: 14,
    borderRadius: 35,
    marginTop: -30,
  },
});
