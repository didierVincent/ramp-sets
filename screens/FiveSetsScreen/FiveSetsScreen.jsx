import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import SetTable from '../../components/SetTable/SetTable';
import { OneRMContext } from '../../context/OneRMContext';

export default function FiveSetsScreen() {
  const {
    setsOneRM,
    setSetsOneRM,
    useBodyweightMode,
    setUseBodyweightMode,
    bodyweight,
    setBodyweight,
    useLbs,
    getUnitLabel,
    formatDisplayValue,
    sanitizeInput,
    parseToKg,
    toggleUnits,
    userSetSettings,
    calculateLoadFrom1RM,
    userGoal,
  } = useContext(OneRMContext);

  const kgRef = useRef(setsOneRM);
  const [inputValue, setInputValue] = useState('');

  const navigation = useNavigation();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('QuickTips')}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="help-circle-outline" size={28} color="#007AFF" />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

  // Sync input with setsOneRM or unit change
  useEffect(() => {
    kgRef.current = setsOneRM;
    const displayStr = formatDisplayValue(setsOneRM);
    if (displayStr !== inputValue) {
      setInputValue(displayStr);
    }
  }, [setsOneRM, useLbs]);

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

  const getSetData = (kg1RM) => {
    const oneRM = parseFloat(kg1RM);
    if (!oneRM) return [];

    const config = userSetSettings[5];
    if (!config || !config.length) return [];

    return config.map((conf, index) => {
      const rm = conf.reps + conf.rir;
      const load = calculateLoadFrom1RM(oneRM, rm);
      return {
        set: index + 1,
        load: Math.round(load),
        loadType: `${rm}RM`,
        reps: conf.reps,
        rir: conf.rir,
      };
    });
  };

  const data = getSetData(kgRef.current);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Ramp Sets</Text>
          
          {userGoal && (
                    <Text style={styles.currentGoal}>Current Goal: {userGoal}</Text>
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
            data={data}
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
            <Switch value={useBodyweightMode} onValueChange={setUseBodyweightMode} />
          </View>

          <View style={styles.toggleRow}>
            <Text>Use lbs</Text>
            <Switch value={useLbs} onValueChange={handleToggleUnit} />
          </View>

          <View style={styles.divider} />
          {!useBodyweightMode && (
            <>
              <Text style={styles.subtitle}>Why choose 5 sets?</Text>
              <Text style={styles.subdescription}>
                Ideal for advanced progression and work capacity. Provides volume and intensity to develop strength and endurance. Best for key lifts focused on consistent overload and technique over time.
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
