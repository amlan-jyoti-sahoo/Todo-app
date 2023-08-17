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
import {Agenda, Calendar} from 'react-native-calendars';
import Todo from '../components/Todo';

import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import tempData from '../data/tempData';

import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';

// const timeToString = time => {
//   const date = new Date(time);
//   //   console.log(date.toISOString().split('T')[0]);
//   return date.toISOString().split('T')[0];
// };

const AllTodoScreen = () => {
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(year + '-' + month + '-' + date);
    console.log(currentDate);
  }, []);
  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState(tempData);
  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('norepeat');

  const renderItem = item => {
    return <Todo>{item.todo}</Todo>;
  };

  const renderEmptyDate = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '400',
            marginTop: 20,
          }}>
          Todo Not Added yet!
        </Text>
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDateModal = () => {
    setDateModalVisible(!isDateModalVisible);
  };
  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
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
          {todo: todoText, description: todoDescText},
        ],
      }));
    } else {
      setItems(prevItems => ({
        ...prevItems,
        [selectedDate]: [{todo: todoText, description: todoDescText}],
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
        selected={selectedDate}
        theme={{
          reservationsBackgroundColor: Colors.Primary500,
          calendarBackground: Colors.Primary800, //agenda background
          agendaKnobColor: Colors.Secondary500, // knob color
          backgroundColor: Colors.Primary800, // background color below agenda
          agendaTodayColor: Colors.white, // today in list
          monthTextColor: Colors.white, // name in calendar
          textDefaultColor: Colors.white,
          todayBackgroundColor: Colors.white,
          dayTextColor: Colors.white, // calendar day
          selectedDayBackgroundColor: Colors.Secondary500, // calendar sel date
          // agendaDayNumColor: 'white', // day number
          // agendaDayTextColor: 'white', // day name
          // textSectionTitleColor: colors.primary,
          // dotColor: "white", // dots
          // textDisabledColor: "red"
        }}
      />

      {/* Add todo modal screen */}
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
            color={Colors.white}
          />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <TextInput
            style={{marginRight: 20, color: Colors.PrimaryTextColor}}
            placeholder="Enter your todo..."
            placeholderTextColor="#636363"
            value={todoText}
            onChangeText={setTodoText}
          />
          <TextInput
            style={{marginRight: 20, color: Colors.PrimaryTextColor}}
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
              <TouchableOpacity onPress={toggleDateModal}>
                <Icon name={'calendar'} size={24} color={Colors.Secondary500} />
              </TouchableOpacity>
              <Text style={{color: Colors.Secondary500}}>{selectedDate}</Text>
              <Icon name={'flag'} size={24} color="#a7a7a7" />
            </View>
            <TouchableOpacity onPress={AddTodoHandler}>
              <View
                style={{
                  width: 40,
                  height: 30,
                  backgroundColor: Colors.Secondary500,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'send'} size={22} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* InnerCalendar Date Picker */}
      <Modal
        isVisible={isDateModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleDateModal}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
        <View style={styles.CalendarContainer}>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
            theme={{
              backgroundColor: Colors.Primary500,
              calendarBackground: Colors.Primary500,
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: Colors.white,
              // textDisabledColor: '',
              monthTextColor: Colors.white,
            }}
          />
          <View>
            <TouchableOpacity onPress={toggleRepeatModal} animationIn="fadeIn">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: Colors.Primary800,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    style={{marginRight: 10}}
                    name="repeat"
                    size={30}
                    color={Colors.Secondary500}
                  />
                  <Text style={styles.constantText}> Set Repeat</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.constantText}>None</Text>
                  <AntIcon
                    style={{marginLeft: 20}}
                    name="right"
                    size={16}
                    color={Colors.Secondary500}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleDateModal();
              }}>
              <Text style={{color: Colors.Secondary500, fontSize: 16}}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDateModal}>
              <Text
                style={{
                  color: Colors.Secondary500,
                  marginLeft: 40,
                  fontSize: 16,
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Repeat Calendar Modal */}
      <Modal
        isVisible={isRepeatModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleRepeatModal}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
        <View style={styles.RepeatCalendarContainer}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="norepeat"
                status={checked === 'norepeat' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('norepeat')}
              />
              <Text style={{color: 'black'}}>No Repeat</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="daily"
                status={checked === 'daily' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('daily')}
              />
              <Text style={{color: 'black'}}>Daily</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleRepeatModal();
              }}>
              <Text style={{color: 'skyblue', fontSize: 16}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleRepeatModal}>
              <Text style={{color: 'skyblue', marginLeft: 40, fontSize: 16}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Button */}
      <FloatingButton onPress={toggleModal} />
    </View>
  );
};

export default AllTodoScreen;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.Primary500,
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
    backgroundColor: Colors.Primary500,
    padding: 10,
  },
  constantText: {
    color: Colors.white,
  },
  floatingButton: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  RepeatCalendarContainer: {
    backgroundColor: Colors.Primary800,
    padding: 10,
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
