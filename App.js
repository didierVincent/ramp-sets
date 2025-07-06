// App.js
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { OneRMProvider, OneRMContext } from './context/OneRMContext';

import TwoSetsScreen from './screens/TwoSetsScreen/TwoSetsScreen';
import ThreeSetsScreen from './screens/ThreeSetsScreen/ThreeSetsScreen';
import FourSetsScreen from './screens/FourSetsScreen/FourSetsScreen';
import FiveSetsScreen from './screens/FiveSetsScreen/FiveSetsScreen';
import OneRMCalculator from './screens/OneRMCalc/OneRMCalc';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import WalkthroughScreen from './screens/WalkthroughScreen/WalkthroughScreen'; // <-- Use WalkthroughScreen, not modal!

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  const { activeSetScreens } = useContext(OneRMContext);

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
      {activeSetScreens.includes(2) && (
        <Tab.Screen name="2 Sets" component={TwoSetsScreen} options={withSettingsIcon('2 Sets')} />
      )}
      {activeSetScreens.includes(3) && (
        <Tab.Screen name="3 Sets" component={ThreeSetsScreen} options={withSettingsIcon('3 Sets')} />
      )}
      {activeSetScreens.includes(4) && (
        <Tab.Screen name="4 Sets" component={FourSetsScreen} options={withSettingsIcon('4 Sets')} />
      )}
      {activeSetScreens.includes(5) && (
        <Tab.Screen name="5 Sets" component={FiveSetsScreen} options={withSettingsIcon('5 Sets')} />
      )}
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { userGoal, userSetSettings, activeSetScreens } = useContext(OneRMContext);

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);

  useEffect(() => {
    const isMissingAll = !userGoal || Object.keys(userSetSettings).length === 0 || activeSetScreens.length === 0;
    setShouldShowOnboarding(isMissingAll);
  }, [userGoal, userSetSettings, activeSetScreens]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {shouldShowOnboarding ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
          <Stack.Screen name="Back" component={MainTabs} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: true, title: 'Settings' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Back" component={MainTabs} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: true, title: 'Settings' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <OneRMProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </OneRMProvider>
  );
}
