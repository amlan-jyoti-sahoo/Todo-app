import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyles';
import {currentDayIndex} from '../../data/DateData';
import SingleHabitTrack from '../SingleHabitTrack';
import {ScrollView} from 'react-native-gesture-handler';
const WeeklyReport = () => {
  const todo = useSelector(state => state.todo.todoData);
  const HabitStatusColors = [
    '#7766bb',
    '#0b8cef',
    '#76b5c5',
    '#e28743',
    '#eab676',
    '#ff9bad',
    '#fedf68',
  ];

  //unique habit extract
  const uniqueTodo = new Set();
  const recurringIdToNameMap = {};

  for (const dateKey in todo) {
    if (Object.hasOwnProperty.call(todo, dateKey)) {
      const todos = todo[dateKey];
      for (const todoItem of todos) {
        if (todoItem.repeatType !== 'norepeat') {
          uniqueTodo.add(todoItem.recurringId);
          // Store the recurring ID and its name in the mapping object
          recurringIdToNameMap[todoItem.recurringId] = todoItem.todoName;
        }
      }
    }
  }

  // Convert the Set to an array
  const uniqueTodoArray = Array.from(uniqueTodo);
  const reversedUniqueTodoArray = uniqueTodoArray.reverse();

  //single habitstatus box
  const currDayIndex = currentDayIndex();
  function habitStatusBox(index, title) {
    return (
      <View
        style={
          currDayIndex == index
            ? styles.daySelectedContainer
            : styles.dayNotSelectedContainer
        }>
        <Text style={[GlobalStyles.textSemiBold, styles.headerDayNameText]}>
          {title}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={[GlobalStyles.textButton, {fontSize: 16}]}>
            Weekly Habit Report
          </Text>
        </View>
        <View style={styles.headerDayNameRootContainer}>
          <View style={styles.headerDayNameContainer}>
            {habitStatusBox(0, 'Mon')}
            {habitStatusBox(1, 'Tue')}
            {habitStatusBox(2, 'Wed')}
            {habitStatusBox(3, 'Thu')}
            {habitStatusBox(4, 'Fri')}
            {habitStatusBox(5, 'Sat')}
            {habitStatusBox(6, 'Sun')}
          </View>
        </View>
        {reversedUniqueTodoArray.map((uniqueTodoReccuringId, index) => (
          <SingleHabitTrack
            key={index}
            uniqueTodoReccuringId={uniqueTodoReccuringId}
            todoName={recurringIdToNameMap[uniqueTodoReccuringId]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default WeeklyReport;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    padding: 10,
  },
  mainContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.Primary500,
  },
  headerTitleContainer: {
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 20,
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
  headerDayNameText: {fontSize: 8},
});
