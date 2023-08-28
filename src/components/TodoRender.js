import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import moment from 'moment-timezone';
import Todo from './Todo';
import TodoImg from '../../assets/images/to-do-list.png';

const TodoRender = ({selectedDate, items}) => {
  const curDay = moment(selectedDate).date();
  const curMonth = Month[moment(selectedDate).month()];
  const toggleTodo = id => {
    // const newData = {...items};
    // const todos = newData[selectedDate];
    // const updatedTodos = todos.map(todo =>
    //   todo.id === id ? {...todo, completed: !todo.completed} : todo,
    // );
    // newData[selectedDate] = updatedTodos;
    // setItems(...items, newData);
  };
  return (
    <ScrollView style={{flex: 1}}>
      {items[selectedDate] ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View style={styles.todoRenderContainer}>
            <Text style={{}}>{`${curDay} ${curMonth}`}</Text>
            {items[selectedDate]
              .filter(todo => !todo.completed)
              .map(todo => (
                <Todo todo={todo} onToggle={toggleTodo} />
              ))}
          </View>
          {items[selectedDate].filter(todo => todo.completed) !== null ? (
            <View style={styles.todoRenderContainer}>
              <Text style={styles.containerTitle}>Completed</Text>
              {items[selectedDate]
                .filter(todo => todo.completed)
                .map(todo => (
                  <Todo todo={todo} onToggle={toggleTodo} />
                ))}
            </View>
          ) : null}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Image source={TodoImg} style={{height: 150, width: 150}} />
          <Text
            style={{
              color: '#f9f1f1',
              fontSize: 20,
              fontWeight: '400',
              marginTop: 20,
            }}>
            Todo Not Added yet!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default TodoRender;

const styles = StyleSheet.create({});
