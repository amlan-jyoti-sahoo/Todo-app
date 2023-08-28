import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/todoData';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/Colors';

function Todo({todo, onToggle}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(todo.completed);

  function checkBoxClicked() {
    if (toggleCheckBox) return true;
    return false;
  }
  const random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  return (
    <View style={styles.todoSublistContainer}>
      <CheckBox
        // disabled={false}
        style={styles.checkBox}
        value={todo.completed ? true : false}
        onValueChange={onToggle(todo.id)}
        animationDuration={0.2}
        tintColors={{true: 'grey', false: 'grey'}}
      />
      <Text
        style={toggleCheckBox ? styles.strikeText : styles.normalText}
        key={todo.id}>
        {todo.todo}
      </Text>
    </View>
  );
}

export default Todo;

const styles = StyleSheet.create({
  todoSublistContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
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
