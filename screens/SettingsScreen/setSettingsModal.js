import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OneRMContext } from '../../context/OneRMContext';

export default function SetSettingsModal({ visible, onClose, onSave, initialSettings }) {
  const [settings, setSettings] = useState(
    initialSettings.map(set => ({
      reps: set.reps.toString(),
      rir: set.rir.toString(),
    }))
  );

  const { userGoal } = useContext(OneRMContext);

  const navigation = useNavigation();

  const goToSetupHelper = () => {
    onClose(); // Optionally close the modal
    navigation.navigate('QuickTips');
  };


  useEffect(() => {
    setSettings(
      initialSettings.map(set => ({
        reps: set.reps.toString(),
        rir: set.rir.toString(),
      }))
    );
  }, [initialSettings, visible]);

  const updateRep = (i, val) => {
    const newSettings = [...settings];
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
        <Text style={styles.title}>Adjust Reps & RIR</Text>
        <Text style={styles.subtitle}>
          Adjust reps to your preference, RIR is more specific to your training focus.
        </Text>

        {userGoal && (
                            <Text style={styles.currentGoal}>Current Focus: {userGoal}</Text>
                              )}

        <View contentContainerStyle={styles.scrollContainer}>
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
        </View>

        <View style={styles.buttonRow}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Save" onPress={handleSave} />
        </View>

        <View style={{ marginTop: 60, marginBottom: 20 }}>
  <Button title="👋 View App Tips & Guide" onPress={goToSetupHelper} color={'grey'} />
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
    paddingBottom: 0,
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
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subtitleSmall: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
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
    marginBottom: 30,
  },
  currentGoal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
});
