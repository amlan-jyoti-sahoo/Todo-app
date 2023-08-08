import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Agenda} from 'react-native-calendars';
import Todo from '../components/Todo';

const timeToString = time => {
  const date = new Date(time);
  //   console.log(date.toISOString().split('T')[0]);
  return date.toISOString().split('T')[0];
};

const Calender = () => {
  const [currentDate, setCurrentDate] = useState('');

  const [items, setItems] = useState({
    '2023-08-08': [
      {name: 'Amlan', cookies: true},
      {name: 'Jyoti', cookies: true},
    ],
    '2023-08-07': [
      {name: 'date 7', cookies: true},
      {name: 'Jyoti', cookies: true},
    ],
  });

  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(year + '-' + month + '-' + date);
    console.log(currentDate);
  }, []);

  const loadItems = day => {
    setSelectedDate(day.dateString);
    console.log('🚀 ~ file: Calender.js:48 ~ loadItems ~ day.dateString:', day);
  };

  const renderItem = item => {
    if (item.name) {
      return <Todo>{item.name}</Todo>;
    }
    return (
      <View style={styles.itemContainer}>
        <Text>No data available</Text>
      </View>
    );
  };

  function AddTodoHandler() {
    console.log(todoText);
    console.log(selectedDate);
    const date = `'${selectedDate}'`;
    console.log(date);
    console.log(items.hasOwnProperty(selectedDate));
    if (items.hasOwnProperty(selectedDate)) {
      setItems(prevItems => ({
        ...prevItems,
        [selectedDate]: [
          ...prevItems[selectedDate],
          {name: todoText, cookies: true},
        ],
      }));
    } else {
      setItems(prevItems => ({
        ...prevItems,
        [selectedDate]: [{name: todoText, cookies: true}],
      }));
    }
    setTodoText('');
    console.log(items);
  }

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        renderItem={renderItem}
        showOnlySelectedDayItems
        // loadItems={loadItems}
        selected={'2023-08-08'}
        loadItemsForMonth={loadItems}
        // renderDay={loadItems}
        // showClosingKnob={true}
        // renderItem={renderItem}
        // testID={testIDs.agenda.CONTAINER}
        // renderEmptyDate={this.renderEmptyDate}
        // rowHasChanged={rowHasChanged}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: '#cddce4', agendaKnobColor: 'green'}}

        // hideExtraDays={true}
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
      <TextInput
        placeholder="enter text"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="add todo" onPress={AddTodoHandler} />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});
