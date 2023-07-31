import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tempData from '../data/tempData';

function Todo({children}) {
  const random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  return (
    <View>
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
  },
});
