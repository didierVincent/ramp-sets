import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';
import SetSettingsModal from './setSettingsModal';
import SetBuilderWalkthroughModal from './SetBuilderWalkthroughModal';

export default function SettingsScreen() {
  const {
    userSetSettings,
    setSetSettings,
    resetSettings,
    applyDefaultSettings,
    activeSetScreens,
    userGoal,
  } = useContext(OneRMContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [walkthroughVisible, setWalkthroughVisible] = useState(false);
  const [selectedSetCounts, setSelectedSetCounts] = useState(activeSetScreens || []);

  useEffect(() => {
    if (activeSetScreens) {
      setSelectedSetCounts(activeSetScreens);
    }
  }, [activeSetScreens]);

  const openModalFor = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentIndex(null);
  };

  const saveSettings = (newSettings) => {
    setSetSettings(currentIndex, newSettings);
    closeModal();
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ramp Set Builder</Text>

      {userGoal && (
        <Text style={styles.currentGoal}>Current Goal: {userGoal}</Text>
      )}

      <Button
        title="Edit Training Focus & Set Tabs"
        onPress={() => setWalkthroughVisible(true)}
        color={'blue'}
      />

      <SetBuilderWalkthroughModal
        visible={walkthroughVisible}
        onClose={() => setWalkthroughVisible(false)}
        onComplete={handleWalkthroughComplete}
        initialGoal={userGoal}
        initialSetCounts={selectedSetCounts}
      />

      <View style={styles.divider} />

      <Text style={styles.subtitle}>
        If you prefer more control, adjust individual set reps and RIR below.
      </Text>

      {selectedSetCounts.length === 0 && (
        <Text style={styles.subtitleSmall}>
          No sets selected yet. Start by using the "Build My Set Plan" button above.
        </Text>
      )}

      {selectedSetCounts.map((n) => (
        <View key={n} style={styles.buttonContainer}>
          <Button
            title={`Adjust ${n} Sets Layout`}
            onPress={() => openModalFor(n)}
            disabled={!userSetSettings || !userSetSettings[n]}
          />
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.resetContainer}>
        <Button
          title="Reset Goals & Set Tabs"
          color="#d9534f"
          onPress={handleReset}
        />
      </View>

      {currentIndex !== null && userSetSettings && userSetSettings[currentIndex] && (
        <SetSettingsModal
          visible={modalVisible}
          onClose={closeModal}
          onSave={saveSettings}
          initialSettings={userSetSettings[currentIndex]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  buttonContainer: { marginBottom: 10 },
  resetContainer: { marginTop: 30 },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 100,
    marginBottom: 8,
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
