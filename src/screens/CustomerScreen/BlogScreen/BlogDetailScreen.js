import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useBlog from "../../../hooks/useBlog";
import useComment from "../../../hooks/useComment";
import Toast from "react-native-toast-message";

export default function BlogDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const { selectedBlog, blogById, loading, error } = useBlog();
  const { selectedComment, commentByBlog, addNewComment } = useComment();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (id) {
      blogById(id);
      commentByBlog(id);
    }
  }, [id]);

  if (!selectedBlog) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy bài viết.</Text>
      </View>
    );
  }

  const blogImages = Array.isArray(selectedBlog.blogImages)
    ? selectedBlog.blogImages
    : []; // đảm bảo là mảng
  const hasImages = blogImages.length > 0;
  const fallbackImage =
    "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png";

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;

    const commentData = {
      blogId: id,
      content: commentContent,
      parentCommentId: null,
    };

    const result = await addNewComment(commentData);
    if (result.success) {
      setCommentContent("");
      commentByBlog(id);
      Toast.show({
        type: "success",
        text1: "Viết bình luận thành công!",
      });
    } else {
      console.log("Comment creation failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* --- phần header Image --- */}
          <ImageBackground
            source={{ uri: hasImages ? blogImages[0] : fallbackImage }}
            style={styles.imageBackground}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View style={styles.overlay} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.category}>
                {selectedBlog.destinationName}
              </Text>
              <Text style={styles.title}>{selectedBlog.title}</Text>
              <View style={styles.authorRow}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.authorText}>
                  {selectedBlog.authorLastName} {selectedBlog.authorFirstName}
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* --- nội dung bài viết --- */}
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>{selectedBlog.title}</Text>
            <Text style={styles.paragraph}>{selectedBlog.content}</Text>
            <Text style={styles.subheading}>
              1. {selectedBlog.destinationName}
            </Text>

            {blogImages.slice(1).map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginTop: 10,
                }}
                resizeMode="cover"
              />
            ))}
          </View>

          {/* --- phần bình luận --- */}
          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Bình luận</Text>

            {selectedComment.length > 0 ? (
              selectedComment.map((item, index) => (
                <View style={styles.commentItem} key={index}>
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
                    }}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>
                      {item.commenterName}
                    </Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>Không có bình luận nào!</Text>
            )}

            {/* --- form bình luận --- */}
            <View style={styles.commentForm}>
              <Text style={styles.commentFormTitle}>Viết bình luận</Text>

              <Text style={styles.commentFormLabel}>Nội dung</Text>
              <TextInput
                style={[
                  styles.commentInput,
                  { height: 80, textAlignVertical: "top", padding: 8 },
                ]}
                multiline
                value={commentContent}
                onChangeText={setCommentContent}
                placeholder="Nhập bình luận của bạn..."
              />

              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleAddComment}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Gửi bình luận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    height: 300,
    justifyContent: "flex-end",
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
  },
  headerContent: {
    zIndex: 2,
  },
  category: {
    color: "#ADD8E6",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 8,
  },
  authorText: {
    color: "#ddd",
    fontSize: 13,
  },

  // content
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },

  // Section comment
  commentSection: {
    marginTop: 32,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 16,
    marginLeft: 15,
    marginRight: 15,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#eee",
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  commentForm: {
    marginTop: 10,
    paddingTop: 16,
    // borderTopWidth: 1,
    borderColor: "#eee",
  },
  commentFormTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  commentFormLabel: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 12,
  },
  commentInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  commentButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 6,
    // marginBottom: 50,
  },
});
