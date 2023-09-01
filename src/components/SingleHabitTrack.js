import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../styles/GlobalStyles';

const SingleHabitTrack = ({habitName}) => {
  return (
    <View style={styles.singleHabitContainer}>
      <View style={styles.habitNameContainer}>
        <Text style={GlobalStyles.textSemiBold}>{habitName}</Text>
      </View>
      <View style={styles.weekTackerRootContainer}>
        <View style={styles.weekTackerContainer}>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
          <View style={styles.dayTackerContainer}></View>
        </View>
      </View>
    </View>
  );
};

export default SingleHabitTrack;

const styles = StyleSheet.create({
  singleHabitContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitNameContainer: {
    width: '40%',
  },
  weekTackerRootContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 3,
  },
  weekTackerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTackerContainer: {
    height: 18,
    width: 18,
    borderRadius: 3,
    backgroundColor: Colors.Secondary300,
  },
});
