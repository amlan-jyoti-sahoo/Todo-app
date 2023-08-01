import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import TodoScreen from './screens/TodoScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AddListModal from './components/AddListModal';
import AddTodoModal from './components/AddTodoModal';

//hello git testing
function App() {
  const RootStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Todo" component={TodoScreen} />
        <RootStack.Screen
          name="AddListModal"
          component={AddListModal}
          options={{presentation: 'modal', headerShown: 'false'}}
        />
        <RootStack.Screen
          name="AddTodoModal"
          component={AddTodoModal}
          options={{presentation: 'modal', headerShown: 'false'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
