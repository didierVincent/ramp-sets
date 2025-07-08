import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';
import SetBuilderWalkthroughModal from './SetBuilderWalkthroughModal';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const {
    userSetSettings,
    setSetSettings,
    resetSettings,
    applyDefaultSettings,
    activeSetScreens,
    userGoal,
  } = useContext(OneRMContext);

  const [walkthroughVisible, setWalkthroughVisible] = useState(false);
  const [selectedSetCounts, setSelectedSetCounts] = useState(activeSetScreens || []);
  const navigation = useNavigation();

  useEffect(() => {
    if (activeSetScreens) {
      setSelectedSetCounts(activeSetScreens);
    }
  }, [activeSetScreens]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('QuickTips')}
          style={{ marginRight: 0 }}
        >
          <Ionicons name="help-circle-outline" size={28} color="#4E52BE" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleWalkthroughComplete = ({ goal, setCounts }) => {
    setWalkthroughVisible(false);

    const sortedSetCounts = [...setCounts].sort((a, b) => a - b);
    setSelectedSetCounts(sortedSetCounts);

    applyDefaultSettings(goal, sortedSetCounts);
  };

  const handleReset = () => {
    resetSettings();
    setSelectedSetCounts([]);
  };

  const openSetSettings = (index) => {
    if (userSetSettings && userSetSettings[index]) {
      navigation.navigate('SetSettings', {
        index,
        initialSettings: userSetSettings[index],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training Focus & Set Layouts</Text>

      {userGoal && (
        <Text style={styles.currentGoal}>Current Focus: {userGoal}</Text>
      )}

      <Button
        title="Edit Settings"
        onPress={() => setWalkthroughVisible(true)}
        color={'#d9534f'}
      />

      <SetBuilderWalkthroughModal
        visible={walkthroughVisible}
        onClose={() => setWalkthroughVisible(false)}
        onComplete={handleWalkthroughComplete}
        initialGoal={userGoal}
        initialSetCounts={selectedSetCounts}
      />

      <View style={styles.divider} />

      <View style={styles.resetContainer}>
        <Button
          title="Reset All Settings"
          color="#d9534f"
          onPress={handleReset}
        />
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>
        If you prefer more control, adjust individual set reps and RIR below.
      </Text>

      {selectedSetCounts.length === 0 && (
        <Text style={styles.subtitleSmall}>
          No set layouts selected yet. 
          {'\n\n'}Tap "Edit Settings" at the top.
        </Text>
      )}

      {selectedSetCounts.map((n) => (
        <View key={n} style={styles.buttonContainer}>
          <Button
            title={`Adjust ${n} Sets Layout`}
            onPress={() => openSetSettings(n)}
            disabled={!userSetSettings || !userSetSettings[n]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  buttonContainer: { marginBottom: 10 },
  resetContainer: { marginTop: 0 },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 100,
    marginBottom: 28,
    textAlign: 'center',
  },
  currentGoal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subtitleSmall: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});
