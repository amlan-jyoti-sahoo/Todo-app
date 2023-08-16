import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';

const FloatingButton = ({selectedDate, setSelectedDate}) => {
  const [isDateModalVisible, setDateModalVisible] = useState(false);

  const toggleDateModal = () => {
    setDateModalVisible(!isDateModalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isDateModalVisible}>
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
          />
          <View>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#f2efef',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    style={{marginRight: 10}}
                    name="repeat"
                    size={30}
                    color="skyblue"
                  />
                  <Text style={styles.constantText}> Set Repeat</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.constantText}>None</Text>
                  <AntIcon
                    style={{marginLeft: 20}}
                    name="right"
                    size={16}
                    color="skyblue"
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
              <Text style={{color: 'skyblue', fontSize: 16}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDateModal}>
              <Text style={{color: 'skyblue', marginLeft: 40, fontSize: 16}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#00c3ff',
    borderRadius: 25,
    width: 50,
    height: 50,
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
});

export default FloatingButton;
