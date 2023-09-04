import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import WeeklyReport from '../components/widget/WeeklyReport';

const HabitTackerScreen = () => {
  return (
    <View style={styles.container}>
      <WeeklyReport />
    </View>
  );
};

export default HabitTackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary800,
  },
});
