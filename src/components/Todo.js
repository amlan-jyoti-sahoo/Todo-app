import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tempData from '../data/todoData';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/Colors';
import {useDispatch} from 'react-redux';
import {todoSlice} from '../store/todoSlice';
import GlobalStyles from '../styles/GlobalStyles';
import {currentDate} from '../data/DateData';
import moment from 'moment-timezone';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
function Todo({todo, selectedDate}) {
  const dispatch = useDispatch();

  const curDay = moment(selectedDate).date();
  const curMonth = Month[moment(selectedDate).month()];

  const [deleteAlertModal, setDeleteAlertModal] = useState(false);

  function toggleDeleteAlertModal() {
    setDeleteAlertModal(!deleteAlertModal);
  }

  function deleteTodoHandler() {
    dispatch(
      todoSlice.actions.DeleteTodo({
        todoId: todo.todoId,
        selectedDate: selectedDate,
      }),
    );
  }

  function deleteAllRecurringTodo() {
    toggleDeleteAlertModal();
    dispatch(
      todoSlice.actions.DeleteAllRecurringTodo({
        recurringId: todo.recurringId,
      }),
    );
  }

  function deleteAllUnfinishedRecurringTodo() {
    toggleDeleteAlertModal();
    dispatch(
      todoSlice.actions.DeleteAllUnfinishedRecurringTodo({
        recurringId: todo.recurringId,
        completed: todo.completed,
      }),
    );
  }

  function checkboxPressHandler() {
    dispatch(
      todoSlice.actions.setCompleteStatus({
        todoId: todo.todoId,
        selectedDate: selectedDate,
      }),
    );
  }

  const leftSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={toggleDeleteAlertModal}>
        <View style={styles.editBox}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={24}
            color={Colors.Secondary800}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={
          todo.repeatType !== 'norepeat'
            ? toggleDeleteAlertModal
            : deleteTodoHandler
        }>
        <View style={styles.deleteBox}>
          <MaterialCommunityIcons
            name="delete"
            size={24}
            color={Colors.error}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Swipeable
        renderLeftActions={leftSwipe}
        renderRightActions={rightSwipe}
        // ref={ref => (row[index] = ref)}
        rightOpenValue={-100}>
        <View style={styles.todoSublistContainer}>
          <View style={styles.todoleftContainer}>
            <CheckBox
              style={styles.checkbox}
              value={todo.completed}
              onValueChange={checkboxPressHandler}
              animationDuration={0.2}
              tintColors={{true: 'grey', false: 'grey'}}
            />
            <Text
              style={todo.completed ? styles.strikeText : styles.normalText}
              key={todo.todoId}>
              {todo.todoName}
            </Text>
          </View>
          <Text
            style={
              todo.completed
                ? [
                    GlobalStyles.textNormal,
                    {fontSize: 10, textAlign: 'center', color: 'gray'},
                  ]
                : [
                    GlobalStyles.textNormal,
                    {
                      fontSize: 10,
                      textAlign: 'center',
                      color: Colors.Secondary500,
                    },
                  ]
            }>
            {selectedDate === currentDate ? 'Today' : `${curDay} ${curMonth}`}
          </Text>
        </View>
      </Swipeable>
      {/* Repeat Calendar Modal */}
      <Modal
        onBackdropPress={toggleDeleteAlertModal}
        isVisible={deleteAlertModal}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <View>
            <Text
              style={[
                GlobalStyles.textBold,
                {fontSize: 18, paddingBottom: 10},
              ]}>
              Delete Recurring Task
            </Text>
            <Text style={[GlobalStyles.textSemiBold]}>
              You are about to delete a recurring task. Please confirm the
              requirment.
            </Text>
          </View>
          <View style={styles.deleteOptionsContainer}>
            <TouchableOpacity
              style={styles.deleteOptionInnerContainer}
              onPress={deleteTodoHandler}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color={'grey'}
              />
              <Text style={[GlobalStyles.textSemiBold, styles.optionText]}>
                Only This Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteOptionInnerContainer}
              onPress={deleteAllRecurringTodo}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color={'grey'}
              />
              <Text style={[GlobalStyles.textSemiBold, styles.optionText]}>
                All Future Recurrences
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteOptionInnerContainer}
              onPress={deleteAllUnfinishedRecurringTodo}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color={'grey'}
              />
              <Text style={[GlobalStyles.textSemiBold, styles.optionText]}>
                All Unfinished Recurrences
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonTextContainer}
            onPress={toggleDeleteAlertModal}>
            <Text style={[GlobalStyles.textButton]}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

export default Todo;

const styles = StyleSheet.create({
  todoSublistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
    backgroundColor: Colors.Primary500,
  },
  todoleftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  normalText: {
    marginLeft: 10,
    color: Colors.PrimaryTextColor,
    fontSize: 16,
  },
  strikeText: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  checkbox: {
    borderRadius: 10,
  },
  editBox: {
    // backgroundColor: Colors.Secondary800,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteBox: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },

  // modal
  modalContainer: {
    backgroundColor: Colors.Primary500,
    padding: 20,
    borderRadius: 10,
  },
  deleteOptionsContainer: {
    marginTop: 20,
  },
  deleteOptionInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  optionText: {
    marginLeft: 10,
  },
  buttonTextContainer: {
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
