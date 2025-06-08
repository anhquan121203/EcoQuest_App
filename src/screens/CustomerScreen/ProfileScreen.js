import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/your-image.jpg' }} // Replace with your avatar URL
          style={styles.avatar}
        />
        <Text style={styles.name}>Eco Quest</Text>
        <Text style={styles.phone}>+84 93847263478</Text>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Thông tin</Text>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="person" size={24} color="#FF7A00" />
          <Text style={styles.infoText}>Hồ sơ</Text>
          <Icon name="chevron-right" size={24} color="#777" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="group" size={24} color="#FF7A00" />
          <Text style={styles.infoText}>Cộng đồng du lịch</Text>
          <Icon name="chevron-right" size={24} color="#777" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Icon name="settings" size={24} color="#FF7A00" />
          <Text style={styles.infoText}>Cài đặt</Text>
          <Icon name="chevron-right" size={24} color="#777" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA726',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  menuIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  phone: {
    fontSize: 16,
    color: '#fff',
  },
  infoContainer: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7A00',
    marginBottom: 20,
  },
  infoItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
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
    marginLeft: 'auto',
  },
});

export default ProfileScreen;
