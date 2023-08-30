import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import Colors from '../styles/Colors';
import GlobalStyles from '../styles/GlobalStyles';
import moment from 'moment-timezone';
import {curDayName} from '../data/DateData';
const SetRepeat = ({toggleRepeatModal, setRepeatTodoHandler}) => {
  const [selectedValue, setSelectedValue] = React.useState('norepeat');

  const onSelect = value => {
    setRepeatTodoHandler(value);
    setSelectedValue(value);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={toggleRepeatModal}>
        <Icon style={styles.closeIcon} name="close" size={30} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.RepeatCalendarContainer}>
        <View style={styles.headerTitle}>
          <Text style={[GlobalStyles.textBold, {fontSize: 16}]}>
            Choose for Repeat
          </Text>
        </View>
        <RadioButton.Group
          onValueChange={value => onSelect(value)}
          value={selectedValue}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="norepeat"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text style={GlobalStyles.textSemiBold}>No Repeat</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="daily"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text style={GlobalStyles.textSemiBold}>Daily (Upto 1 Year)</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="weekday"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text style={GlobalStyles.textSemiBold}>
              Every Weekday (Mon Fri)
            </Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="oneWeek"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text
              style={
                GlobalStyles.textSemiBold
              }>{`One Week (${curDayName})`}</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="oneMonth"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text style={GlobalStyles.textSemiBold}>{`One Month`}</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="oneYear"
              color={Colors.Secondary500}
              uncheckedColor="gray"
            />
            <Text style={GlobalStyles.textSemiBold}>{`One Year`}</Text>
          </View>
        </RadioButton.Group>
        <View style={styles.warningText}>
          <Text
            style={[GlobalStyles.textNormal, {color: '#f0afaf', fontSize: 11}]}>
            * You can add recurring tasks upto 1 year in advance.
          </Text>
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
    </>
  );
};

export default SetRepeat;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.Primary800,
  },
  closeIconContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    right: 0,
    top: 0,
  },
  headerTitle: {
    padding: 10,
  },
  RepeatCalendarContainer: {
    backgroundColor: Colors.Primary500,
    padding: 10,
    borderRadius: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningText: {
    backgroundColor: '#2b2929',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
