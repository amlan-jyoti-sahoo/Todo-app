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
    <View style={styles.container}>
      <View style={styles.mainContainer}>
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
    </View>
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
    borderRadius: 10,

    backgroundColor: Colors.Primary500,
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
