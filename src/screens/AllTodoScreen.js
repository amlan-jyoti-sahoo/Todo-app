import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import {WeekCalendarRef, WeekCalendar} from 'react-native-scrollable-calendars';
import moment from 'moment-timezone';

import tempData from '../data/todoData';
import Month, {currentDate} from '../data/DateData';
import FloatingButton from '../components/UI/FloatingButton';
import Colors from '../styles/Colors';
import TodoRender from '../components/TodoRender';
import SetRepeat from '../components/SetRepeat';
import {useDispatch, useSelector} from 'react-redux';
import {todoSlice} from '../store/todoSlice';

const AllTodoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.todoData);

  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');
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

  function AddTodoHandler() {
    const date = `'${selectedDate}'`;
    dispatch(
      todoSlice.actions.AddTodo({
        selectedDate: selectedDate,
        todoText: todoText,
        todoDescText: todoDescText,
        repeatType: repeatType,
        recurringId: new Date().toString(),
      }),
    );
    setTodoText('');
    setTodoDescText('');
    setRepeatType('norepeat');
    console.log(todo[selectedDate]);
    toggleModal();
  }

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
    console.log(repeatType);
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
            <TouchableOpacity
              onPress={AddTodoHandler}
              disabled={todoText === ''}
              style={todoText === '' ? {opacity: 0.5} : null}>
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
                  <Text style={styles.constantText}>{repeatType}</Text>
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
