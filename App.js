import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OneRMProvider } from './context/OneRMContext';

import TwoSetsScreen from './screens/TwoSetsScreen/TwoSetsScreen';
import ThreeSetsScreen from './screens/ThreeSetsScreen/ThreeSetsScreen';
import FourSetsScreen from './screens/FourSetsScreen/FourSetsScreen';
import FiveSetsScreen from './screens/FiveSetsScreen/FiveSetsScreen';
import OneRMCalculator from './screens/OneRMCalc/OneRMCalc';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <OneRMProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="1RM Calc" component={OneRMCalculator} />
        <Tab.Screen name="2 Sets" component={TwoSetsScreen} />
        <Tab.Screen name="3 Sets" component={ThreeSetsScreen} />
        <Tab.Screen name="4 Sets" component={FourSetsScreen} />
        <Tab.Screen name="5 Sets" component={FiveSetsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </OneRMProvider>
  );
}
