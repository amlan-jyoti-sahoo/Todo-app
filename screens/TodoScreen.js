import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import tempData from '../data/tempData';
import TodoList from '../components/TodoList';
import {useNavigation} from '@react-navigation/native';

function TodoScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>
          Todo <Text style={{fontWeight: '300', color: '#00aeff'}}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{marginVertical: 48}}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => {
            navigation.navigate('AddListModal');
          }}>
          <Icon name="plus" size={16} color={Colors.blue} />
        </TouchableOpacity>
        <Text style={styles.addText}>Add List</Text>
      </View>
      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={tempData}
          keyExtractor={item => item.name + Math.floor(Math.random() * 100) + 1}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <TodoList list={item} />}
        />
      </View>
    </View>
  );
}

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  dividerText: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: Colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
