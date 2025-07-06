import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function SetSettingsModal({ visible, onClose, onSave, initialSettings }) {
  // Store reps and RIR as strings to allow smooth input editing
  const [settings, setSettings] = useState(
    initialSettings.map(set => ({
      reps: set.reps.toString(),
      rir: set.rir.toString(),
    }))
  );

  // Sync local state with initialSettings when modal opens/closes
  useEffect(() => {
    setSettings(
      initialSettings.map(set => ({
        reps: set.reps.toString(),
        rir: set.rir.toString(),
      }))
    );
  }, [initialSettings, visible]);

  // Update input string without clamping on edit
  const updateRep = (i, val) => {
    const newSettings = [...settings];
    // Allow only digits and empty string
    if (/^\d*$/.test(val)) {
      newSettings[i].reps = val;
      setSettings(newSettings);
    }
  };

  const updateRIR = (i, val) => {
    const newSettings = [...settings];
    if (/^\d*$/.test(val)) {
      newSettings[i].rir = val;
      setSettings(newSettings);
    }
  };

  // On Save: clamp values and convert to numbers
  const handleSave = () => {
    const clampedSettings = settings.map(({ reps, rir }) => {
      let repsNum = parseInt(reps, 10);
      if (isNaN(repsNum) || repsNum < 1) repsNum = 1;
      else if (repsNum > 20) repsNum = 20;

      let rirNum = parseInt(rir, 10);
      if (isNaN(rirNum) || rirNum < 0) rirNum = 0;
      else if (rirNum > 20) rirNum = 20;

      return { reps: repsNum, rir: rirNum };
    });
    onSave(clampedSettings);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Set Settings</Text>
        <Text style={styles.subtitle}>
          Adjust reps and RIR (Reps In Reserve) for each set below.
        </Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {settings.map((set, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.setLabel}>Set {i + 1}</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Reps:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={2}
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
                  maxLength={2}
                  value={set.rir}
                  onChangeText={(val) => updateRIR(i, val)}
                  placeholder="RIR"
                />
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonRow}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 150,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  setLabel: {
    fontSize: 18,
    fontWeight: '600',
    width: 60,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130,
    justifyContent: 'flex-start',
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 4,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 200,
  },
});
