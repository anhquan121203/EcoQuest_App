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
import Entypo from "@expo/vector-icons/Entypo";
import useTrip from "../../../hooks/useTrip";
import { Picker } from "@react-native-picker/picker";

export default function PostBlogScreen() {
  const navigation = useNavigation();
  const { trips, fetchTrips } = useTrip();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [BlogImages, setBlogImages] = useState(null);
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
        Toast.show({
            type: "infor",
            text1: "Cho phép truy cập ảnh để tiếp tục.",
          });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

const handlePost = async () => {
    try {
        const blogData = {
            Title,
            Content,
            TripId,
            BlogImages,
        }
        const result = await addNewBlog(blogData);
        if (result.success) {
            Toast.show({
                type: "success",
                text1: "Bài viết đã được đăng.",
            });
        }
        return result;
    } catch (error) {
        console.error("handlePost error:", error);
        return { success: false, error };
    }
}


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
            {trips.map((item) => {
              return (
                <Picker.Item
                  key={item.tripId}
                  label={item.tripName}
                  value={item.tripId}
                />
              );
            })}
          </Picker>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Chọn ảnh (tùy chọn)</Text>
        </TouchableOpacity>

        {BlogImages && <Image source={{ uri: BlogImages }} style={styles.image} />}

        <Button title="Đăng bài viết" onPress={handlePost} color="#007BFF" />
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

  //   header******************************************
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

  //   content******************************************
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
});
