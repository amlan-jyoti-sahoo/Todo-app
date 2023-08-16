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

import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import tempData from '../data/tempData';

import Modal from 'react-native-modal';

// const timeToString = time => {
//   const date = new Date(time);
//   //   console.log(date.toISOString().split('T')[0]);
//   return date.toISOString().split('T')[0];
// };

const AllTodoScreen = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState(tempData);
  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(year + '-' + month + '-' + date);
    console.log(currentDate);
  }, []);

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [isModalVisible, setModalVisible] = useState(false);

  const renderItem = item => {
    return <Todo>{item.todo}</Todo>;
  };

  const renderEmptyDate = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Todo Not Added yet!</Text>
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    toggleModal();
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
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleModal}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <TextInput
            style={{marginRight: 20, color: '#000000'}}
            placeholder="Enter your todo..."
            placeholderTextColor="#636363"
            value={todoText}
            onChangeText={setTodoText}
          />
          <TextInput
            style={{marginRight: 20, color: '#000000'}}
            placeholder="Description"
            placeholderTextColor="#636363"
            value={todoDescText}
            onChangeText={setTodoDescText}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: 150,
              }}>
              {/* <TouchableOpacity onPress={toggleDateModal}> */}
              <TouchableOpacity>
                <Icon name={'calendar'} size={24} color="#00c3ff" />
              </TouchableOpacity>
              <Text style={{color: '#00c3ff'}}>{selectedDate}</Text>
              <Icon name={'flag'} size={24} color="#a7a7a7" />
            </View>
            <View
              style={{
                width: 40,
                height: 30,
                backgroundColor: '#00c3ff',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={AddTodoHandler}>
                <Icon name={'send'} size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FloatingButton
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TouchableOpacity style={styles.FloatingButton} onPress={toggleModal}>
        <Icon name="add" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

export default AllTodoScreen;

const styles = StyleSheet.create({
  FloatingButton: {
    backgroundColor: '#00c3ff',
    borderRadius: 25,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    right: 0,
    top: 0,
  },
  CalendarContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  constantText: {
    color: 'black',
  },
  floatingButton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
});

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
