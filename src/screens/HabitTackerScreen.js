import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import SingleHabitTrack from '../components/SingleHabitTrack';

const HabitTackerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerDayNameRootContainer}>
          <View style={styles.headerDayNameContainer}>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Mon
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Tue
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Wed
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Thu
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Fri
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Sat
            </Text>
            <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
              Sun
            </Text>
          </View>
        </View>
        <SingleHabitTrack habitName="study react native" />
        <SingleHabitTrack habitName="Morning Walk" />
      </View>
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
  mainContainer: {
    width: '100%',
    padding: 20,
  },
  headerDayNameRootContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  headerDayNameContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
  },
  headerDayNameText: {fontSize: 10},
});
