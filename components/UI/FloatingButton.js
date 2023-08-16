import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const FloatingButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [todoDescText, setTodoDescText] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const sendButtonHandler = () => {
    toggleModal();
  };
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={toggleModal}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <TextInput
            style={{marginRight: 20, color: 'white'}}
            placeholder="Enter your todo..."
            placeholderTextColor="#636363"
            value={todoText}
            onChangeText={setTodoText}
          />
          <TextInput
            style={{marginRight: 20, color: 'white'}}
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
              <Icon
                name={'calendar'}
                size={24}
                color="#00c3ff"
                // onPress={DatePicker}
              />
              <Text style={{color: '#00c3ff'}}>Today</Text>
              <Icon name={'flag'} size={24} color="#a7a7a7" />
            </View>
            <View
              style={{
                width: 40,
                height: 30,
                backgroundColor: '#00c3ff',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={sendButtonHandler}>
                <Icon name={'send'} size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Icon name="add" size={20} color="white" />
      </TouchableOpacity>
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
});

export default FloatingButton;
