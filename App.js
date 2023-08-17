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
import Colors from './styles/Colors';

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
          activeTintColor: '#F60081',
          tabBarStyle: {
            backgroundColor: Colors.Primary800,
            borderTopColor: 'transparent',
          },
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
          headerTitleStyle: {
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.Primary800,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.Secondary500,
        })}>
        <BottomTab.Screen
          name="AllTodoScreen"
          component={AllTodoScreen}
          options={{
            headerTitle: 'Todo',
          }}
        />
        <BottomTab.Screen
          name="HabitTackerScreen"
          component={HabitTackerScreen}
          options={{
            headerTitle: 'Habit',
          }}
        />
        <BottomTab.Screen
          name="Setting"
          component={Setting}
          options={{
            headerTitle: 'Settings',
          }}
        />
      </BottomTab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: 'black',
            borderTopColor: 'transparent',
          },
        })}>
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
