import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../styles/GlobalStyles';
import {useSelector} from 'react-redux';
import {currentDate, currentDayIndex} from '../data/DateData';
import Colors from '../styles/Colors';

const SingleHabitTrack = ({uniqueTodoReccuringId, todoName}) => {
  const todo = useSelector(state => state.todo.todoData);

  //   const selectedTodoIndex = todo[date].findIndex(
  //     item => item.recurringId === uniqueTodoReccuringId,
  //   );

  const currDayIndex = currentDayIndex();
  const currentDateStr = new Date(currentDate);
  //get starting date
  const startingDate = new Date(currentDateStr);
  startingDate.setDate(startingDate.getDate() - currDayIndex);
  const weekStartingDate = startingDate.toISOString().split('T')[0];

  function getEachDate(index) {
    const choosenDate = new Date(weekStartingDate);
    choosenDate.setDate(choosenDate.getDate() + index);
    const choosenDateFormatted = choosenDate.toISOString().split('T')[0];
    return choosenDateFormatted;
  }

  function taskCompletedCheck(index) {
    const date = getEachDate(index);
    if (todo.hasOwnProperty(date)) {
      const selectedIndex = todo[date].findIndex(
        item => item.recurringId === uniqueTodoReccuringId,
      );
      if (selectedIndex !== -1) {
        return todo[date][selectedIndex].completed;
      } else {
        return false;
      }
    }
    return false;
  }
  return (
    <View style={styles.singleHabitContainer}>
      <View style={styles.habitNameContainer}>
        <Text style={GlobalStyles.textNormal}>{todoName}</Text>
      </View>
      <View style={styles.weekTackerRootContainer}>
        <View style={styles.weekTackerContainer}>
          <View
            style={
              taskCompletedCheck(0)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(1)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(2)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(3)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(4)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(5)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
          <View
            style={
              taskCompletedCheck(6)
                ? styles.completedContainer
                : styles.inCompletedContainer
            }></View>
        </View>
      </View>
    </View>
  );
};

export default SingleHabitTrack;

const styles = StyleSheet.create({
  singleHabitContainer: {
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  completedContainer: {
    height: 17,
    width: 17,
    borderRadius: 3,
    backgroundColor: Colors.Secondary300,
  },
  inCompletedContainer: {
    height: 17,
    width: 17,
    borderRadius: 3,
    backgroundColor: 'grey',
  },
});
