import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import AllTodoScreen from './screens/AllTodoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HabitTackerScreen from './screens/HabitTackerScreen';
import Colors from './styles/Colors';
import Pomodoro from './screens/Pomodoro';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//Screens

const allTodoScreen = 'AllTodoScreen';
const habitTackerScreen = 'HabitTackerScreen';
const pomodoro = 'Pomodoro';

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
          name="Pomodoro"
          component={Pomodoro}
          options={{
            headerTitle: 'Pomodoro',
            tabBarIcon: ({focused, color, size}) => (
              <MaterialCommunityIcons
                name={focused ? 'timer-sand-full' : 'timer-sand'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
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
            {/* <Stack.Screen name="TodoEditScreen" component={TodoEditScreen} />
        <Stack.Screen name="Setting" component={Setting} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({});
