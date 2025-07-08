import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import SetTable from '../../components/SetTable/SetTable';
import { OneRMContext } from '../../context/OneRMContext';

export default function TwoSetsScreen() {
  const {
    setsOneRM, setSetsOneRM,
    useBodyweightMode, setUseBodyweightMode,
    bodyweight, setBodyweight,
    useLbs, getUnitLabel,
    formatDisplayValue, sanitizeInput, parseToKg,
    toggleUnits, calculateLoadFrom1RM,
    userSetSettings,
    userGoal,
  } = useContext(OneRMContext);

  const kgRef = useRef(setsOneRM);
  const [inputValue, setInputValue] = useState('');
  const [setData, setSetData] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('QuickTips')}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="help-circle-outline" size={28} color="#4E52BE" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Sync text input display when 1RM or unit changes
  useEffect(() => {
    kgRef.current = setsOneRM;
    const displayStr = formatDisplayValue(setsOneRM);
    if (displayStr !== inputValue) {
      setInputValue(displayStr);
    }
  }, [setsOneRM, useLbs]);

  // Update set data when 1RM or user-defined settings change
  useEffect(() => {
  const oneRM = parseFloat(kgRef.current) || 0;
  const config = userSetSettings[2];
  if (!oneRM || !config?.length) {
    setSetData([]);
    return;
  }

  const updated = config.map((conf, index) => {
    const totalReps = conf.reps + conf.rir;
    const load = calculateLoadFrom1RM(oneRM, totalReps);
    return {
      set: index + 1,
      load: Math.round(load),
      loadType: `${totalReps}RM`,
      reps: conf.reps,
      rir: conf.rir,
    };
  });

  setSetData(updated);
}, [setsOneRM, userSetSettings]);



  const onChangeText = (text) => {
    const clean = sanitizeInput(text);
    setInputValue(clean);

    const kgVal = parseToKg(clean);
    if (kgVal !== kgRef.current) {
      kgRef.current = kgVal;
      setSetsOneRM(kgVal);
    }
  };

  const handleToggleUnit = () => {
    toggleUnits();
    const newDisplay = formatDisplayValue(kgRef.current, !useLbs);
    setInputValue(newDisplay);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Ramp Sets</Text>

          {userGoal && (
                  <Text style={styles.currentGoal}>Current Focus: {userGoal}</Text>
                )}

          <Text style={styles.label}>Build sets off your 1RM:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={onChangeText}
            placeholder={`Enter 1 Rep Max (${getUnitLabel()})`}
          />

          <SetTable
            data={setData}
            bodyweight={useBodyweightMode ? parseFloat(bodyweight) : null}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.toggleRow}>
            {useBodyweightMode && (
              <TextInput
                style={styles.input2}
                keyboardType="numeric"
                placeholder="kg"
                value={bodyweight}
                onChangeText={setBodyweight}
              />
            )}
            <Text>Use Bodyweight + Load</Text>
            <Switch
              value={useBodyweightMode}
              onValueChange={setUseBodyweightMode}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text>Use lbs</Text>
            <Switch value={useLbs} onValueChange={handleToggleUnit} />
          </View>

          <View style={styles.divider} />
          {!useBodyweightMode && (
            <>
              <Text style={styles.subtitle}>Why choose 2 sets?</Text>
              <Text style={styles.subdescription}>
                Best for isolation movements, time efficiency, or exercises you’re maintaining. Works well when intensity is high (low RIR), or as accessory volume in a dense program.
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  label: { fontSize: 18 },
  input: { borderWidth: 1, padding: 10, fontSize: 18, marginTop: 10 },
  input2: { borderWidth: 1, padding: 5, fontSize: 18, marginTop: 10 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  divider: {
    alignItems: 'center',
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subdescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  currentGoal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
});
