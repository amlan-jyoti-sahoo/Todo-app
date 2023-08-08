import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import Calendar from './screens/Calender';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Setting from './screens/Setting';
import Icon from 'react-native-vector-icons/Ionicons';

//Screens

const calendar = 'Calendar';
const setting = 'Setting';

function App() {
  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName={Calendar}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === calendar) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (rn === setting) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <BottomTab.Screen name="Calendar" component={Calendar} />
        <BottomTab.Screen name="Setting" component={Setting} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
