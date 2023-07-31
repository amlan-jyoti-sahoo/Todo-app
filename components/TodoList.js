import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import {useNavigation} from '@react-navigation/native';

function TodoList({list}) {
  const navigation = useNavigation();
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <TouchableOpacity
      // style={styles.addList}
      onPress={() => {
        navigation.navigate('AddTodoModal');
      }}>
      <View style={[styles.listContainer, {backgroundColor: list.color}]}>
        <Text style={styles.listTitle}>{list.name}</Text>
        <View style={styles.innerListContainer}>
          <Text style={[styles.listNumText, styles.listText]}>
            {completedCount}
          </Text>
          <Text style={styles.listText}>Completed</Text>
          <Text style={[styles.listNumText, styles.listText]}>
            {remainingCount}
          </Text>
          <Text style={styles.listText}>Not completed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    width: 200,
    backgroundColor: '#ff0000',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  innerListContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
  listNumText: {
    fontSize: 48,
    fontWeight: '200',
  },
  listText: {
    color: Colors.white,
  },
});
