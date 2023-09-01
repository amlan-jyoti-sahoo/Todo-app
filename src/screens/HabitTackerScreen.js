import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import SingleHabitTrack from '../components/SingleHabitTrack';
import {useSelector} from 'react-redux';
import {currentDayIndex} from '../data/DateData';

const HabitTackerScreen = () => {
  const todo = useSelector(state => state.todo.todoData);

  // Create a Set to store unique todo names
  const uniqueTodo = new Set();

  // Iterate through each date key in the todoData object
  for (const dateKey in todo) {
    if (Object.hasOwnProperty.call(todo, dateKey)) {
      const todos = todo[dateKey];
      // Iterate through todos for each date
      for (const todo of todos) {
        // Check if the repeatType is not equal to 'norepeat'
        if (todo.repeatType !== 'norepeat') {
          // Add the todoName to the Set to ensure uniqueness
          uniqueTodo.add(todo.recurringId);
        }
      }
    }
  }

  // Convert the Set to an array if needed
  const uniqueTodoArray = Array.from(uniqueTodo);

  console.log(uniqueTodoArray);

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
        {uniqueTodoArray.map((uniqueTodoReccuringId, index) => (
          <SingleHabitTrack
            key={index}
            uniqueTodoReccuringId={uniqueTodoReccuringId}
          />
        ))}
      </View>
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
