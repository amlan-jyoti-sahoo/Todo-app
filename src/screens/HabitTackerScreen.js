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
      for (const todo of todos) {
        if (todo.repeatType !== 'norepeat') {
          uniqueTodo.add(todo.recurringId);
        }
      }
    }
  }

  // Convert the Set to an array if needed
  const uniqueTodoArray = Array.from(uniqueTodo);

  const currDayIndex = currentDayIndex();

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerDayNameRootContainer}>
          <View style={styles.headerDayNameContainer}>
            <View
              style={
                currDayIndex == 0
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Mon
              </Text>
            </View>
            <View
              style={
                currDayIndex == 1
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Tue
              </Text>
            </View>
            <View
              style={
                currDayIndex == 2
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Wed
              </Text>
            </View>
            <View
              style={
                currDayIndex == 3
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Thu
              </Text>
            </View>
            <View
              style={
                currDayIndex == 4
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Fri
              </Text>
            </View>
            <View
              style={
                currDayIndex == 5
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Sat
              </Text>
            </View>
            <View
              style={
                currDayIndex == 6
                  ? styles.daySelectedContainer
                  : styles.dayNotSelectedContainer
              }>
              <Text
                style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
                Sun
              </Text>
            </View>
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
  daySelectedContainer: {
    backgroundColor: Colors.Secondary500,
    height: 23,
    width: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  dayNotSelectedContainer: {
    height: 23,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  headerDayNameText: {fontSize: 10},
});
