import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/tempData';
import CheckBox from '@react-native-community/checkbox';

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
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
        animationDuration={0.2}
      />
      <Text style={styles.todoTitle} key={children + random}>
        {children}
      </Text>
    </View>
  );
}

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    marginHorizontal: 50,
    color: '#000',
  },
  todoTitle: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 20,
  },
  todoSublistContainer: {
    flexDirection: 'row',
    margin: 10,
  },
});
