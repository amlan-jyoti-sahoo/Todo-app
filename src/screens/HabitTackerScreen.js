import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';

const HabitTackerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HabitTackerScreen</Text>
      <FloatingButton />
    </View>

    // Floating Button
  );
};

export default HabitTackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary800,
  },
});
