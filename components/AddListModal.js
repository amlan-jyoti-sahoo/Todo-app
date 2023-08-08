import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../styles/Colors';
import tempData from '../data/tempData';

function TodoRender({navigation}) {
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D85963',
    '#D159D8',
    '#D88559',
  ];

  const [name, setName] = useState('');
  const [color, setColor] = useState(backgroundColors[0]);

  function closeModal() {
    navigation.goBack();
  }
  function createTodo() {
    tempData.push({
      name,
      color,
      todos: [],
    });

    setName('');
    closeModal();
  }

  function renderColors() {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, {backgroundColor: color}]}
          onPress={() => setColor(color)}
        />
      );
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableOpacity
        style={{position: 'absolute', top: 40, right: 32}}
        onPress={closeModal}>
        <Icon name="close" size={24} color={Colors.black} />
      </TouchableOpacity>
      <View style={{marginHorizontal: 32, alignSelf: 'stretch'}}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          placeholder="List Name?"
          onChangeText={text => setName(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, {backgroundColor: color}]}
          onPress={createTodo}>
          <Text style={{color: Colors.white, fontWeight: '600'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default TodoRender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    color: Colors.black,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
