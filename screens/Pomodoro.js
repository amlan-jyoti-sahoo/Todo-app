import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

const Pomodoro = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  const [selectedSeconds, setSelectedSeconds] = useState('5');

  interval = null;

  componentDidUpdate = (prevProp, prevState) => {
    if (remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      stop();
    }
  };

  const componentWillUnmount = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

  start = () => {
    setRemainingSeconds(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 30),
    );
    setIsRunning(true);

    interval = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);
  };

  stop = () => {
    clearInterval(interval);
    interval = null;
    setRemainingSeconds(5);
    setIsRunning(false);
  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedMinutes}
        onValueChange={itemValue => {
          setSelectedMinutes(itemValue);
        }}
        mode="dropDown">
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedSeconds}
        onValueChange={itemValue => {
          setSelectedSeconds(itemValue);
        }}
        mode="dropDown">
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  );
  const {minutes, seconds} = getRemaining(remainingSeconds);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}
      {isRunning ? (
        <TouchableOpacity
          onPress={this.stop}
          style={[styles.button, styles.buttonStop]}>
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={this.start} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  picker: {
    flex: 1,
    maxWidth: 100,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: 'rgba(92, 92, 92, 0.206)',
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
