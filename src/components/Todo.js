import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/todoData';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/Colors';
import {useDispatch} from 'react-redux';
import {todoSlice} from '../store/todoSlice';
import GlobalStyles from '../styles/GlobalStyles';
import {currentDate} from '../data/DateData';
import moment from 'moment-timezone';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Todo({todo, selectedDate, index}) {
  const dispatch = useDispatch();

  const curDay = moment(selectedDate).date();
  const curMonth = Month[moment(selectedDate).month()];
  console.log('🚀 ~ file: Todo.js:16 ~ curMonth:', curMonth);

  const leftSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.editBox}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={24}
            color={'white'}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <MaterialCommunityIcons name="delete" size={24} color={'white'} />
        </View>
      </TouchableOpacity>
    );
  };
  function checkboxPressHandler() {
    dispatch(
      todoSlice.actions.setCompleteStatus({
        todoId: todo.todoId,
        selectedDate: selectedDate,
      }),
    );
  }

  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View key={index} style={styles.todoSublistContainer}>
        <View style={styles.todoleftContainer}>
          <CheckBox
            style={styles.checkbox}
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
          style={
            todo.completed
              ? [
                  GlobalStyles.textNormal,
                  {fontSize: 10, textAlign: 'center', color: 'gray'},
                ]
              : [
                  GlobalStyles.textNormal,
                  {
                    fontSize: 10,
                    textAlign: 'center',
                    color: Colors.Secondary500,
                  },
                ]
          }>
          {selectedDate === currentDate ? 'Today' : `${curDay} ${curMonth}`}
        </Text>
      </View>
    </Swipeable>
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
    alignItems: 'center',
  },
  normalText: {
    marginLeft: 10,
    color: Colors.PrimaryTextColor,
    fontSize: 16,
  },
  strikeText: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  checkbox: {
    borderRadius: 10,
  },
  editBox: {
    backgroundColor: Colors.Secondary800,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
});
