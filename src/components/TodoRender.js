import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import moment from 'moment-timezone';
import Todo from './Todo';
import TodoImg from '../../assets/images/to-do-list.png';
import {useSelector} from 'react-redux';
import GlobalStyles from '../styles/GlobalStyles';
import {currentDate} from '../data/DateData';

const TodoRender = ({selectedDate}) => {
  const todo = useSelector(state => state.todo.todoData);
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
    <ScrollView style={styles.rootContainer}>
      {todo[selectedDate] ? (
        <View style={styles.todoCompleteContainer}>
          <View style={styles.todoRenderContainer}>
            <Text style={GlobalStyles.textBold}>
              {selectedDate === currentDate
                ? 'TODAY'
                : `${curDay} ${curMonth.toUpperCase()}`}
            </Text>
            {todo[selectedDate]
              .filter(todo => !todo.completed)
              .map(todo => (
                <Todo
                  key={todo.todoId}
                  todo={todo}
                  selectedDate={selectedDate}
                />
              ))}
          </View>
          {todo[selectedDate].filter(todo => todo.completed === true) !==
          null ? (
            <View style={styles.todoRenderContainer}>
              <Text style={GlobalStyles.textBold}>Completed</Text>
              {todo[selectedDate]
                .filter(todo => todo.completed)
                .map(todo => (
                  <Todo
                    key={todo.todoId}
                    todo={todo}
                    selectedDate={selectedDate}
                  />
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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  todoCompleteContainer: {
    flex: 1,
  },
  todoRenderContainer: {
    backgroundColor: Colors.Primary500,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
});
