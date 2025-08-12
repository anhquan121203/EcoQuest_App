import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, Feather } from "@expo/vector-icons";

// Static sample data (from the JSON you provided)
const SAMPLE_PAYMENTS = [
  {
    paymentId: 'ebe4bb7f-a9e4-4c95-89eb-366e04745bc3',
    tripId: '4817ca5c-74f8-4a59-b5c3-a12468e788e3',
    amount: 0,
    method: 'PayOs',
    status: 'Pending',
    paidAt: '2025-08-10T11:48:16.6373505',
  },
  {
    paymentId: '38243d35-3994-43c4-b208-c0a2bd07fc69',
    tripId: 'e4786403-572d-42f6-b1db-67f624679104',
    amount: 0,
    method: 'PayOs',
    status: 'Pending',
    paidAt: '2025-08-12T16:52:10.6532195',
  },
  {
    paymentId: '0dbd083e-d2c7-4a53-ac90-f628129ffe29',
    tripId: '41bc2be3-d7db-4b6b-8f3e-d6986e793e89',
    amount: 0,
    method: 'PayOs',
    status: 'Pending',
    paidAt: '2025-08-12T14:37:10.3940415',
  },
];

export default function PaymentHistoryScreen({ navigation }) {
  const payments = SAMPLE_PAYMENTS;

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return iso;
    }
  };

  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    } catch (e) {
      return value + ' VND';
    }
  };

  const renderStatus = (status) => {
    const isPending = status?.toLowerCase() === 'pending';
    const bgColor = isPending ? styles.statusPending : styles.statusSuccess;
    return (
      <View style={[styles.statusWrap, bgColor]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        // Placeholder: navigate to detail screen if needed
        // navigation?.navigate('PaymentDetail', { paymentId: item.paymentId });
        // For now do nothing (static screen)
      }}
    >
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
            onPress={() => navigation.goBack()}
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
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E6E9F0', marginTop: 40, flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", },
  
//   headerTitle: { fontSize: 20, fontWeight: '700' },
  headerSubtitle: { fontSize: 15, color: '#6B7280', marginTop: 4, marginLeft: 16 },
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
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  colLeft: {},
  colRight: { alignItems: 'flex-end' },
  amount: { fontSize: 16, fontWeight: '700' },
  method: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  statusWrap: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  statusPending: { backgroundColor: '#FFF4E5' },
  statusSuccess: { backgroundColor: '#E6FFFA' },
  date: { fontSize: 12, color: '#9CA3AF', marginTop: 6 },
  metaRow: { flexDirection: 'row', marginTop: 8 },
  metaLabel: { fontSize: 12, color: '#6B7280', width: 80 },
  metaValue: { fontSize: 12, color: '#111827', flex: 1 },
  emptyWrap: { padding: 24, alignItems: 'center' },
  emptyText: { color: '#9CA3AF' },
});
