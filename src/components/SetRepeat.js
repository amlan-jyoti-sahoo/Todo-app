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
const SetRepeat = ({toggleRepeatModal}) => {
  const [checked, setChecked] = React.useState('norepeat');
  return (
    <>
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={toggleRepeatModal}>
        <Icon style={styles.closeIcon} name="close" size={30} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.RepeatCalendarContainer}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="norepeat"
              completed={checked === 'norepeat' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('norepeat')}
            />
            <Text style={{color: 'white'}}>No Repeat</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="daily"
              completed={checked === 'daily' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('daily')}
            />
            <Text style={{color: 'white'}}>Daily</Text>
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
  RepeatCalendarContainer: {
    backgroundColor: Colors.Primary500,
    padding: 10,
  },
});
