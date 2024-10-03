import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Movies App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0f4067',  // Blue background
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: 0,
  },
  headerText: {
    color: 'white',  // White text
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
