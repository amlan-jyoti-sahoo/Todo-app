import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Month, {currentDate} from '../data/DateData';
import Colors from '../styles/Colors';
import {useDispatch} from 'react-redux';
import {todoSlice} from '../store/todoSlice';
import GlobalStyles from '../styles/GlobalStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';

const AddTodo = ({
  toggleModal,
  toggleDateModal,
  selectedDate,
  repeatType,
  setRepeatType,
  toggleRepeatModal,
}) => {
  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');

  function AddTodoHandler() {
    const recurringTime = new Date();
    dispatch(
      todoSlice.actions.AddTodo({
        selectedDate: selectedDate,
        todoText: todoText,
        todoDescText: todoDescText,
        repeatType: repeatType,
        recurringId: `${recurringTime}`,
      }),
    );
    setTodoText('');
    setTodoDescText('');
    setRepeatType('norepeat');
    toggleModal();
  }

  return (
    <>
      <TouchableOpacity style={styles.closeIconContainer} onPress={toggleModal}>
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
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={toggleDateModal}
              style={styles.calendarContainer}>
              <Icon name={'calendar'} size={24} color={Colors.Secondary500} />
              <Text style={{color: Colors.Secondary500, marginLeft: 10}}>
                {selectedDate === currentDate ? 'Today' : selectedDate}
              </Text>
            </TouchableOpacity>
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
        <View style={styles.setRepeatRootContainer}>
          <TouchableOpacity onPress={toggleRepeatModal} animationIn="fadeIn">
            <View style={styles.setRepeatInnerLeft}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  style={{marginRight: 10}}
                  name="repeat"
                  size={30}
                  color={Colors.Secondary500}
                />
                <Text style={GlobalStyles.textBold}> Set Repeat</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={GlobalStyles.textButton}>{repeatType}</Text>
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
      </View>
    </>
  );
};

export default AddTodo;

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
  container: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 150,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  setRepeatRootContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  setRepeatInnerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.Primary800,
  },
});
