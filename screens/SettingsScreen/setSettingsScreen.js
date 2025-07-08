// SetSettingsScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OneRMContext } from '../../context/OneRMContext';

export default function SetSettingsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { userGoal, setSetSettings } = useContext(OneRMContext);

  const { index, initialSettings } = route.params;

  const [settings, setSettings] = useState(
    initialSettings.map(set => ({
      reps: set.reps.toString(),
      rir: set.rir.toString(),
    }))
  );

  const updateRep = (i, val) => {
    const newSettings = [...settings];
    if (/^\d*$/.test(val)) newSettings[i].reps = val;
    setSettings(newSettings);
  };

  const updateRIR = (i, val) => {
    const newSettings = [...settings];
    if (/^\d*$/.test(val)) newSettings[i].rir = val;
    setSettings(newSettings);
  };

  const handleSave = () => {
    const clampedSettings = settings.map(({ reps, rir }) => ({
      reps: Math.min(Math.max(parseInt(reps) || 1, 1), 20),
      rir: Math.min(Math.max(parseInt(rir) || 0, 0), 20),
    }));
    setSetSettings(index, clampedSettings);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adjust Reps & RIR</Text>
      <Text style={styles.subtitle}>
        Adjust reps to your preference. RIR is more specific to your training focus.
      </Text>
      {userGoal && <Text style={styles.currentGoal}>Current Focus: {userGoal}</Text>}

      {settings.map((set, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.setLabel}>Set {i + 1}</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reps:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={set.reps}
              onChangeText={(val) => updateRep(i, val)}
              placeholder="Reps"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>RIR:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={set.rir}
              onChangeText={(val) => updateRIR(i, val)}
              placeholder="RIR"
            />
          </View>
        </View>
      ))}

      <View style={styles.buttonRow}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={handleSave} />
      </View>

      <Button
        title="📘 App Tips & Guide"
        onPress={() => navigation.navigate('QuickTips')}
        color="#4E52BE"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 12, textAlign: 'center' },
  currentGoal: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  setLabel: { fontSize: 18, fontWeight: '600', width: 60 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', width: 130 },
  inputLabel: { fontSize: 16, marginRight: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 6, flex: 1, borderRadius: 4 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, marginBottom: 30 },
});
