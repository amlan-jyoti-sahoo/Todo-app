import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../styles/Colors';
import Todo from './Todo';
import tempData from '../data/tempData';

function AddTodoModal({navigation}) {
  const [todoText, setTodoText] = useState('');

  function closeModal() {
    navigation.goBack();
  }

  const todos = tempData[0].todos;

  function handleSubmit() {}
  //   function fetchTodo() {

  //   }

  if (!todos.length) {
    return (
      <View>
        <Text>Start creating a new todo</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', top: 40, right: 32}}
        onPress={closeModal}>
        <Icon name="close" size={24} color={Colors.black} />
      </TouchableOpacity>
      <View>
        <Text style={styles.todoListTitle}>{tempData[0].name}</Text>
        <Text style={styles.completeStatus}>2 out 4 completed</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.todoContainer}>
        {todos.map(todo => (
          <Todo>{todo.title}</Todo>
        ))}
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Add Todo"
          value={todoText}
          onChangeText={setTodoText}
          style={styles.todoInput}
        />
        <TouchableOpacity style={styles.plusIcon}>
          <Icon name="plus" size={30} color={Colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  todoListTitle: {
    marginTop: 50,
    marginHorizontal: 50,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  completeStatus: {
    marginHorizontal: 50,
  },
  divider: {
    borderBottomWidth: 2,
    width: '70%',
    backgroundColor: '#000',
    marginTop: 5,
    marginHorizontal: 50,
    marginBottom: 30,
  },
  todoContainer: {
    marginHorizontal: 50,
    color: '#000',
  },
  todoTitle: {
    fontSize: 20,
    marginVertical: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 50,
  },
  todoInput: {
    borderWidth: 1,
    width: '70%',
    marginHorizontal: 20,
    borderRadius: 20,
    fontSize: 20,
    paddingHorizontal: 10,
    backgroundColor: '#cccc',
  },
  plusIcon: {
    borderWidth: 1,
    // borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
