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
import FloatingButton from '../components/UI/FloatingButton';
import tempData from '../data/tempData';

// const timeToString = time => {
//   const date = new Date(time);
//   //   console.log(date.toISOString().split('T')[0]);
//   return date.toISOString().split('T')[0];
// };

const Calender = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState(tempData);
  const [todoText, setTodoText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(year + '-' + month + '-' + date);
  }, []);

  const renderItem = item => {
    return <Todo>{item.name}</Todo>;
  };

  const renderEmptyDate = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Todo Not Added yet!</Text>
      </View>
    );
  };

  function AddTodoHandler() {
    const date = `'${selectedDate}'`;
    console.log('🚀 ~ file: Calender.js:65 ~ AddTodoHandler ~ date:', date);
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
        onDayPress={day => setSelectedDate(day.dateString)}
        showOnlySelectedDayItems
        renderEmptyData={renderEmptyDate}
        selected={currentDate}
      />
      <TextInput
        placeholder="enter text"
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="add todo" onPress={AddTodoHandler} />
      <FloatingButton />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});

{
  /* <Agenda
        items={items}
        renderItem={renderItem}
        onDayPress={day => setSelectedDate(day.dateString)}
        showOnlySelectedDayItems
        renderEmptyData={renderEmptyDate}
        // loadItems={loadItems}
        selected={currentDate}
        // loadItemsForMonth={loadItems}
        // renderDay={loadItems}
        // showClosingKnob={true}
        // renderItem={renderItem}
        // testID={testIDs.agenda.CONTAINER}
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
      /> */
}
