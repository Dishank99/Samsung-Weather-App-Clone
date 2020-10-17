import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Home from './screens/Home.js';

export default function App() {
  return (
    <LinearGradient
      colors={['#0E3386', '#ADD8E6']}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0, y: 1.2 }}
      style={styles.container}
    >
      <Home />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
});
