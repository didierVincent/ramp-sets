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
import WalkthroughScreen from './screens/WalkthroughScreen/WalkthroughScreen'; 
import SetupHelper from './screens/SettingsScreen/SetupHelper';
import QuickTips from './screens/SettingsScreen/QuickTips';
import SetSettingsScreen from './screens/SettingsScreen/setSettingsScreen';

import HyperTwoSetScreen from './screens/HyperTwoSetScreen/HyperTwoSetScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }) {
  const { activeSetScreens } = useContext(OneRMContext);

  const withSettingsIcon = (screenName) => ({
    title: screenName,
    headerLeft: () => (
      <Ionicons
        name="settings-outline"
        size={24}
        style={{ marginLeft: 15 }}
        onPress={() => navigation.navigate('Settings')}
      />
    ),
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="1RM Calc" component={OneRMCalculator} options={withSettingsIcon('1RM Calc')} />
      {/* <Tab.Screen name="Hyp-2" component={HyperTwoSetScreen} options={withSettingsIcon('Hyp-2')}/> */}
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

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(null); // null means loading
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isMissingAll = !userGoal || Object.keys(userSetSettings).length === 0 || activeSetScreens.length === 0;
    setShouldShowOnboarding(isMissingAll);
    setIsReady(true); // Only show navigator once decision is made
  }, [userGoal, userSetSettings, activeSetScreens]);

  if (!isReady) return null; // Prevents initial flicker

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {shouldShowOnboarding ? (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ animation: 'none' }} // disables animation
          />
          <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
          <Stack.Screen name="Back" component={MainTabs} />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: true, title: 'Settings' }}
          />
          <Stack.Screen
            name="SetupHelper"
            component={SetupHelper}
            options={{ title: 'Training Tips & Guide', headerShown: true }}
          />
          <Stack.Screen
          name="SetSettings"
          component={SetSettingsScreen}
          options={{
            presentation: 'modal', // <- key part
            title: 'Adjust Sets',
            headerShown: true,
          }}
          />
          <Stack.Screen
            name="QuickTips"
            component={QuickTips}
            options={{ title: 'Quick Tips', headerStyle: {
      backgroundColor: '#4E52BE', // Header background
    }, headerShown: true }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Back"
            component={MainTabs}
            options={{ animation: 'none' }} // disables initial slide
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: true, title: 'Settings' }}
          />
          <Stack.Screen
            name="SetupHelper"
            component={SetupHelper}
            options={{ title: 'Training Tips & Guide', headerShown: true }}
          />
          <Stack.Screen
          name="SetSettings"
          component={SetSettingsScreen}
          options={{
            presentation: 'modal', // <- key part
            title: 'Adjust Sets',
            headerShown: true,
          }}
          />

          <Stack.Screen
            name="QuickTips"
            component={QuickTips}
            options={{ title: 'Quick Tips', headerStyle: {
      backgroundColor: '#4E52BE', // Header background
    }, headerShown: true }}
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
