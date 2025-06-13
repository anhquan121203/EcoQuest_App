import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { verifyUser } from "../../api/apiAuth";
import { CustomButton } from "../../components/Button";

export default function VerifyModal({ visible, onClose, onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    if (!visible) return;

    const handleUrl = async (url) => {
      try {
        const keyEncoded = url.replace(/^.*?:\/\//, "");
        const key = decodeURIComponent(keyEncoded);
        const response = await verifyUser(key);

        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Xác minh lỗi:", error);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    const getInitial = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleUrl(url);
      } else {
        setLoading(false); // Không có URL thì ngưng loading
      }
    };

    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    getInitial();

    return () => {
      subscription.remove();
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {loading && <ActivityIndicator size="large" />}
          {!loading && status === "success" && (
            <>
              <Text style={styles.title}>✅ Xác minh thành công!</Text>
              <CustomButton title="Đăng nhập" onPress={onSuccess} type="primary" />
            </>
          )}
          {!loading && status === "error" && (
            <>
              <Text style={styles.title}>Xác minh thất bại!</Text>
              <CustomButton title="Đóng" onPress={onClose} type="secondary" />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});
