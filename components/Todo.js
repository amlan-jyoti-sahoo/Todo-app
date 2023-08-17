import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/tempData';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/Colors';

function Todo({children, checkBoxClicked}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  function checkBoxClicked() {
    if (toggleCheckBox) return true;
    return false;
  }
  const random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  return (
    <View style={styles.todoSublistContainer}>
      <CheckBox
        disabled={false}
        style={styles.checkBox}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        animationDuration={0.2}
        tintColors={{true: 'grey', false: 'grey'}}
      />
      <Text
        style={toggleCheckBox ? styles.strikeText : styles.normalText}
        key={children + random}>
        {children}
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
