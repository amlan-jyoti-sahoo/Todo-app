import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Agenda, Calendar} from 'react-native-calendars';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import {WeekCalendarRef, WeekCalendar} from 'react-native-scrollable-calendars';
import moment from 'moment';

import Todo from '../components/Todo';
import tempData from '../data/tempData';
import Month from '../data/DateData';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';

const AllTodoScreen = ({navigation}) => {
  useEffect(() => {
    setCurrentDate(moment().toISOString().split('T')[0]);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: curMonth,
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(currentDate);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: Colors.PrimaryTextColor,
              }}>
              Today
            </Text>
          </TouchableOpacity>
          <Icon
            style={{marginLeft: 20}}
            name="ellipsis-vertical"
            size={20}
            color={'white'}
          />
        </View>
      ),
    });
  }, [navigation]);

  const [currentDate, setCurrentDate] = useState(
    moment().toISOString().split('T')[0],
  );
  const [items, setItems] = useState(tempData);
  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('norepeat');
  const [week, setWeek] = useState(new Date().toISOString());

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDateModal = () => {
    setDateModalVisible(!isDateModalVisible);
  };
  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
  };
  const toggleCalendarModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };

  const renderItem = item => {
    if (item.status === false) return <Todo>{item.todo}</Todo>;
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
          {todo: todoText, description: todoDescText, status: false},
        ],
      }));
    } else {
      setItems(prevItems => ({
        ...prevItems,
        [selectedDate]: [
          {todo: todoText, description: todoDescText, status: false},
        ],
      }));
    }
    setTodoText('');
    console.log(items);
    toggleModal();
  }

  const markedDates = {};
  Object.keys(items).forEach(date => {
    markedDates[date] = {
      marked: true,
      type: 'dot',
      // background: '#858594',
      color: 'blue' /* Customize as needed */,
    };
  });

  const curDay = moment(selectedDate).date();
  const curMonth = Month[moment(selectedDate).month()];

  return (
    <View style={styles.rootContainer}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={toggleCalendarModal}>
          <Icon name={'calendar'} size={24} color={Colors.Secondary500} />
        </TouchableOpacity>
        {selectedDate ? <Text>{selectedDate}</Text> : <Text>Choose Date</Text>}
      </View>
      <WeekCalendar
        // ref={ref}
        autoSelect="markedDate"
        dayNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        // renderDayNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        // style={{backgroundColor: Colors.Primary800}}
        // style={{backgroundColor: 'yellow'}}
        markedDates={markedDates}
        selected={selectedDate}
        onSelectDate={(value, source) => {
          console.log(
            '🚀 ~ file: AllTodoScreen.js:116 ~ AllTodoScreen ~ source:',
            source,
          );
          setSelectedDate(`${value}`);
        }}
        onWeekChange={w => {
          console.log(
            '🚀 ~ file: AllTodoScreen.js:119 ~ AllTodoScreen ~ w:',
            w,
          );
          setWeek(w);
          // setSelectedDate(w);
        }}
        // theme={{selected: 'black', header: 'black', dot: 'red'}}
      />
      <View style={{backgroundColor: '#000000', height: 440, width: 400}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {items[selectedDate] ? (
            <View style={styles.todoInCompleteContainer}>
              <Text>{`${curDay} ${curMonth}`}</Text>
              <FlatList
                data={items[selectedDate]}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>
          ) : (
            <Text
              style={{
                color: '#f9f1f1',
                fontSize: 20,
                fontWeight: '400',
                marginTop: 20,
              }}>
              Todo Not Added yet!
            </Text>
          )}
        </View>
      </View>

      {/* Home screen Calendar Modal */}
      <Modal
        isVisible={isCalendarModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleCalendarModal}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={30}
            color={Colors.white}
          />
        </TouchableOpacity>

        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
            toggleCalendarModal();
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: '#000000',
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
      </Modal>

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
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.Primary800,
  },
  modalContent: {
    backgroundColor: Colors.Primary500,
    padding: 20,
    borderRadius: 10,
  },
  todoInCompleteContainer: {
    backgroundColor: Colors.Primary500,
    width: '100%',
    margin: 10,
    padding: 10,
    marginRight: 10,
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
