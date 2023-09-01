import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AddTodo = () => {
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: 150,
            }}>
            <TouchableOpacity
              onPress={toggleDateModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
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
        <View
          style={{
            height: 40,
            width: 220,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 35,
              width: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: Colors.Secondary500,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={GlobalStyles.textButton}>Todo</Text>
          </View>
          <View
            style={{
              height: 35,
              width: 100,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[GlobalStyles.textButton, {color: 'grey'}]}>
              Habit
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddTodo;

const styles = StyleSheet.create({});
