import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {WeekCalendar} from 'react-native-scrollable-calendars';
import moment from 'moment-timezone';

import Month, {currentDate} from '../data/DateData';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';
import TodoRender from '../components/TodoRender';
import SetRepeat from '../components/SetRepeat';
import {useSelector} from 'react-redux';
import AddTodo from '../components/AddTodo';
const AllTodoScreen = ({navigation}) => {
  const todo = useSelector(state => state.todo.todoData);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatType, setRepeatType] = useState('norepeat');

  const curDay = moment(selectedDate).date();
  const curMonth = Month[moment(selectedDate).month()];

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
          <TouchableOpacity onPress={toggleCalendarModal}>
            <Icon name={'calendar'} size={24} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(currentDate);
              navigateToSelectedDay(currentDate);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 20,
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
  }, [navigation, selectedDate]);

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

  const markedDates = {};
  Object.keys(todo).forEach(date => {
    markedDates[date] = {
      marked: true,
      type: 'dot',
      // background: '#858594',
      color: 'red',
    };
  });

  //to navigate to particular date
  const weekCalendarRef = useRef();

  const navigateToSelectedDay = selectedDate => {
    if (weekCalendarRef.current) {
      weekCalendarRef.current.scrollToDate(selectedDate);
    }
  };

  const setRepeatTodoHandler = repeatText => {
    setRepeatType(repeatText);
  };
  return (
    <View style={styles.rootContainer}>
      <WeekCalendar
        ref={weekCalendarRef}
        autoSelect="markedDate"
        dayNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        // renderDayNames={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        // style={{backgroundColor: 'yellow'}}
        markedDates={markedDates}
        selected={selectedDate}
        onSelectDate={(value, source) => {
          setSelectedDate(value);
        }}
        // onWeekChange={w => {}}
        theme={{
          selected: {backgroundColor: Colors.Secondary500, color: Colors.white},
        }}
      />

      {/* All Todo Render Here */}
      <TodoRender selectedDate={selectedDate} />

      {/* Home screen Calendar Modal */}
      <Modal
        onBackdropPress={toggleCalendarModal}
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
            navigateToSelectedDay(day.dateString);
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
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <AddTodo
          toggleModal={toggleModal}
          toggleDateModal={toggleDateModal}
          selectedDate={selectedDate}
          repeatType={repeatType}
          setRepeatType={setRepeatType}
          toggleRepeatModal={toggleRepeatModal}
        />
      </Modal>

      {/* InnerCalendar Date Picker */}
      <Modal
        onBackdropPress={toggleDateModal}
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
              navigateToSelectedDay(day.dateString);
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
        onBackdropPress={toggleRepeatModal}
        isVisible={isRepeatModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <SetRepeat
          toggleRepeatModal={toggleRepeatModal}
          setRepeatTodoHandler={setRepeatTodoHandler}
        />
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
  header: {
    backgroundColor: 'yellow',
  },
});
