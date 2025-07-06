// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { OneRMProvider } from './context/OneRMContext';

import TwoSetsScreen from './screens/TwoSetsScreen/TwoSetsScreen';
import ThreeSetsScreen from './screens/ThreeSetsScreen/ThreeSetsScreen';
import FourSetsScreen from './screens/FourSetsScreen/FourSetsScreen';
import FiveSetsScreen from './screens/FiveSetsScreen/FiveSetsScreen';
import OneRMCalculator from './screens/OneRMCalc/OneRMCalc';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Wrap each screen in a stack so we can add a header icon
function MainTabs({ navigation }) {
  const withSettingsIcon = (screenName) => ({
    title: screenName,
    headerRight: () => (
      <Ionicons
        name="settings-outline"
        size={24}
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate('Settings')}
      />
    ),
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="1RM Calc" component={OneRMCalculator} options={withSettingsIcon('1RM Calc')} />
      <Tab.Screen name="2 Sets" component={TwoSetsScreen} options={withSettingsIcon('2 Sets')} />
      <Tab.Screen name="3 Sets" component={ThreeSetsScreen} options={withSettingsIcon('3 Sets')} />
      <Tab.Screen name="4 Sets" component={FourSetsScreen} options={withSettingsIcon('4 Sets')} />
      <Tab.Screen name="5 Sets" component={FiveSetsScreen} options={withSettingsIcon('5 Sets')} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <OneRMProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Back"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OneRMProvider>
  );
}
