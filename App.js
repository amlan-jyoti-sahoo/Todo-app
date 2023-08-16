import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import AllTodoScreen from './screens/AllTodoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from './screens/Setting';
import Icon from 'react-native-vector-icons/Ionicons';
import HabitTackerScreen from './screens/HabitTackerScreen';
import TodoEditScreen from './screens/TodoEditScreen';

//Screens

const allTodoScreen = 'AllTodoScreen';
const habitTackerScreen = 'HabitTackerScreen';
const setting = 'Setting';

function App() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();

  function BottomTabScreens() {
    return (
      <BottomTab.Navigator
        initialRouteName={AllTodoScreen}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === allTodoScreen) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (rn === habitTackerScreen) {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (rn === setting) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'skyblue',
        })}>
        <BottomTab.Screen name="AllTodoScreen" component={AllTodoScreen} />
        <BottomTab.Screen
          name="HabitTackerScreen"
          component={HabitTackerScreen}
        />
        <BottomTab.Screen name="Setting" component={Setting} />
      </BottomTab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabScreens"
          component={BottomTabScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen name="TodoEditScreen" component={TodoEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
