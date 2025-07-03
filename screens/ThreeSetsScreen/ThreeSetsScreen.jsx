import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';

import SetTable from '../../components/SetTable/SetTable';
import { OneRMContext } from '../../context/OneRMContext';

export default function ThreeSetsScreen() {
  const {
    setsOneRM, setSetsOneRM,
    useBodyweightMode, setUseBodyweightMode,
    bodyweight, setBodyweight,
    useLbs, getUnitLabel,
    formatDisplayValue, sanitizeInput, parseToKg, toggleUnits,
  } = useContext(OneRMContext);

  const kgRef = useRef(setsOneRM);
  const [inputValue, setInputValue] = useState('');

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
    const tenRM = oneRM / (1 + 10 / 30);
    const eightRM = oneRM / (1 + 8 / 30);
    const fiveRM = oneRM / (1 + 5 / 30);

    return [
      { set: 1, load: Math.round(tenRM), loadType: '10RM', reps: 7, rir: 3 },
      { set: 2, load: Math.round(eightRM), loadType: '8RM', reps: 6, rir: 2 },
      { set: 3, load: Math.round(fiveRM), loadType: '5RM', reps: 5, rir: 0 },
    ];
  };

  const data = getSetData(kgRef.current);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Ramp Sets</Text>
          <Text style={styles.description}>
            RIR: 3 → 2 → 0{'\n'}Reps: 7, 6, 5
          </Text>

          <Text style={styles.label}>Ramp Sets based on your 1RM:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={5}
            value={inputValue}
            onChangeText={onChangeText}
            placeholder={`1 Rep Max (${getUnitLabel()})`}
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
    <Text style={styles.subtitle}>Why choose 3 sets?</Text>
    <Text style={styles.subdescription}>
      A balanced option for most lifts. Great for combining intensity and volume without accumulating excessive fatigue. Ideal for moderate effort compounds and accessories.
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
});
