import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';

const FloatingButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.FloatingButton} onPress={onPress}>
      <Icon name="add" size={30} color="#ffffff" />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  FloatingButton: {
    backgroundColor: Colors.Secondary500,
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
