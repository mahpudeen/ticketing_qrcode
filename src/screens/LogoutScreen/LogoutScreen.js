import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import Logo from '../../../assets/images/logo.jpg';

const LogoutScreen = ({ onLogout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Show the confirmation modal
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    // Perform logout actions
    setModalVisible(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    // Cancel logout
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Scanner Ticketing</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
      <Text style={styles.text}>version : 1.0 </Text>

      <LogoutConfirmationModal
        visible={modalVisible}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#051954',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: 'white',
    borderWidth: 1,
  },
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
});

export default LogoutScreen;