import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, Feather } from "@expo/vector-icons";
import usePayment from "../../../hooks/usePayment";


export default function PaymentHistoryScreen({ navigation }) {
  
  const { payments, loading, error, listPaymentHistory } = usePayment();

  useEffect(() => {
    listPaymentHistory();
  }, []);


  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return iso;
    }
  };

  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    } catch (e) {
      return value + " VND";
    }
  };

  const renderStatus = (status) => {
    const isPending = status?.toLowerCase() === "pending";
    const bgColor = isPending ? styles.statusPending : styles.statusSuccess;
    return (
      <View style={[styles.statusWrap, bgColor]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.7}>
    <View style={styles.row}>
      <View style={styles.colLeft}>
        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        <Text style={styles.method}>{item.method}</Text>
      </View>

      <View style={styles.colRight}>
        {renderStatus(item.status)}
        <Text style={styles.date}>{formatDate(item.paidAt)}</Text>
      </View>
    </View>

    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>Payment ID:</Text>
      <Text style={styles.metaValue} numberOfLines={1} ellipsizeMode="middle">
        {item.paymentId}
      </Text>
    </View>

    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>Trip ID:</Text>
      <Text style={styles.metaValue} numberOfLines={1} ellipsizeMode="middle">
        {item.tripId}
      </Text>
    </View>
  </TouchableOpacity>
);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Tabs", {screen: "Profile"})}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={styles.iconHeader}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Lịch sử thanh toán</Text>
        </View>
      </View>
      <Text style={styles.headerSubtitle}>{payments.length} giao dịch</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.paymentId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E9F0",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  //   headerTitle: { fontSize: 20, fontWeight: '700' },
  headerSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 4,
    marginLeft: 16,
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
  listContent: { padding: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colLeft: {},
  colRight: { alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "700" },
  method: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  statusWrap: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: "600" },
  statusPending: { backgroundColor: "#FFF4E5" },
  statusSuccess: { backgroundColor: "#E6FFFA" },
  date: { fontSize: 12, color: "#9CA3AF", marginTop: 6 },
  metaRow: { flexDirection: "row", marginTop: 8 },
  metaLabel: { fontSize: 12, color: "#6B7280", width: 80 },
  metaValue: { fontSize: 12, color: "#111827", flex: 1 },
  emptyWrap: { padding: 24, alignItems: "center" },
  emptyText: { color: "#9CA3AF" },
});
