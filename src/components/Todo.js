import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/todoData';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/Colors';
import {useDispatch} from 'react-redux';
import {todoSlice} from '../store/todoSlice';
import GlobalStyles from '../styles/GlobalStyles';

function Todo({todo, selectedDate, index}) {
  const dispatch = useDispatch();

  function checkboxPressHandler() {
    dispatch(
      todoSlice.actions.setCompleteStatus({
        todoId: todo.todoId,
        selectedDate: selectedDate,
      }),
    );
  }

  return (
    <View key={index} style={styles.todoSublistContainer}>
      <View style={styles.todoleftContainer}>
        <CheckBox
          style={styles.checkBox}
          value={todo.completed}
          onValueChange={checkboxPressHandler}
          animationDuration={0.2}
          tintColors={{true: 'grey', false: 'grey'}}
        />
        <Text
          style={todo.completed ? styles.strikeText : styles.normalText}
          key={todo.todoId}>
          {todo.todoName}
        </Text>
      </View>
      <Text
        style={[GlobalStyles.textNormal, {fontSize: 10, textAlign: 'center'}]}>
        29 sep
      </Text>
    </View>
  );
}

export default Todo;

const styles = StyleSheet.create({
  todoSublistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  todoleftContainer: {
    flexDirection: 'row',
  },
  normalText: {
    marginLeft: 10,
    color: Colors.PrimaryTextColor,
    fontSize: 18,
  },
  strikeText: {
    marginLeft: 10,
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
});
