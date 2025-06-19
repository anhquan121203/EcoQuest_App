import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useTrip from "../../../hooks/useTrip";
import useBlog from "../../../hooks/useBlog";
import useAuth from "../../../hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

export default function PostBlogScreen() {
  const navigation = useNavigation();
  const { trips, fetchTrips } = useTrip();
  const { addNewBlog } = useBlog();
  const { userId } = useAuth();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [BlogImages, setBlogImages] = useState([]); // support multiple images
  const [TripId, setTripId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleChange = (value) => {
    setTripId(value);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Lỗi", "Bạn cần cho phép truy cập thư viện ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setBlogImages(result.assets); // store as array
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Content", Content);
      formData.append("TripId", TripId);

      if (BlogImages && BlogImages.length > 0) {
        BlogImages.forEach((img) => {
          const filename = img.uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename ?? "");
          const type = match ? `image/${match[1]}` : `image`;

          formData.append("BlogImages", {
            uri: img.uri,
            name: filename,
            type,
          });
        });
      }

      const result = await addNewBlog(formData);

      if (result.success && !result.data?.success) {
        Toast.show({
          type: "error",
          text1: "Lỗi đăng bài viết",
          text2: result.data?.message || "Vui lòng kiểm tra lại.",
        });
        return;
      }

      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Bài viết đã được đăng.",
        });
        navigation.goBack();
      }

      console.log("🚀 Blog POST result:", result);
      return result;
    } catch (error) {
      console.error("handlePost error:", error);
      return { success: false, error };
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tiêu đề"
          value={Title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Nội dung</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Viết nội dung bài viết..."
          value={Content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
        />

        <Text style={styles.label}>Chọn chuyến đi</Text>
        <Picker
          selectedValue={TripId}
          style={styles.inputRow}
          onValueChange={handleChange}
        >
          <Picker.Item label="Chọn chuyến đi" value={null} />
          {trips
            .filter((item) => item.status === 3 && item.user_id === userId)
            .map((item) => (
              <Picker.Item
                key={item.tripId}
                label={item.tripName}
                value={item.tripId}
              />
            ))}
        </Picker>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>
            Chọn ảnh (nhiều ảnh được phép)
          </Text>
        </TouchableOpacity>

        {BlogImages &&
          BlogImages.map((img, index) => (
            <Image key={index} source={{ uri: img.uri }} style={styles.image} />
          ))}

        <Button
          title="Đăng bài viết"
          onPress={handlePost}
          color="#007BFF"
          style={styles.buttonPost}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    padding: 20,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 16,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: "rgba(0, 0, 0 , 0.3)",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
  content: {
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  imagePicker: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerText: {
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonPost: {
    marginBottom: 60,
    padding: 20,
  },
});
