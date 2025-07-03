import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from 'react-native';

import { OneRMContext } from '../../context/OneRMContext';

export default function OneRMCalculator() {
  const [inputWeight, setInputWeight] = useState('');
  const [reps, setReps] = useState('');

  const {
    rawOneRM,
    useLbs,
    setUseLbs,
    convertToKg,
    convertToLbs,
    getUnitLabel,
    convertForDisplay,
    calculate1RM,
    setOneRMFromCalc,
  } = useContext(OneRMContext);

  const prevUseLbs = useRef(useLbs);
  const isTogglingUnits = useRef(false);

  // Recalculate 1RM when inputWeight or reps change
  useEffect(() => {
    const weightNum = parseFloat(inputWeight.trim());
    const repsNum = parseInt(reps.trim());

    if (!isNaN(weightNum) && !isNaN(repsNum)) {
      const weightInKg = useLbs ? convertToKg(weightNum) : weightNum;
      setOneRMFromCalc(calculate1RM(weightInKg, repsNum));
    } else {
      setOneRMFromCalc(0);
    }
  }, [inputWeight, reps]);

  // Convert input weight when toggling units, only if toggle was user initiated
  useEffect(() => {
    if (prevUseLbs.current !== useLbs && isTogglingUnits.current) {
      const parsed = parseFloat(inputWeight);
      if (!isNaN(parsed)) {
        const converted = useLbs ? convertToLbs(parsed) : convertToKg(parsed);
        setInputWeight(converted.toFixed(0));
      }
      isTogglingUnits.current = false;
      prevUseLbs.current = useLbs;
    }
  }, [useLbs]);

  const toggleUnits = () => {
    isTogglingUnits.current = true;
    setUseLbs(prev => !prev);
  };

  const clearInputs = () => {
    setInputWeight('');
    setReps('');
    setOneRMFromCalc(0);
  };

  const renderRMGrid = () => {
    return [...Array(9)].map((_, i) => {
      const repsCount = i + 2;
      const estKg = rawOneRM / (1 + repsCount / 30);
      const display = useLbs
        ? convertToLbs(estKg).toFixed(0)
        : estKg.toFixed(0);
      return (
        <View key={`${repsCount}-${useLbs}`} style={styles.gridBox}>
          <Text style={styles.gridLabel}>{repsCount}RM</Text>
          <Text style={styles.gridValue}>
            {display} {getUnitLabel()}
          </Text>
        </View>
      );
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>1-Rep Max Calculator</Text>

        <View style={styles.resultBox}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Your 1RM = </Text>
            <Text style={styles.resultValue}>
              {convertForDisplay(rawOneRM)} {getUnitLabel()}
            </Text>
          </View>
        </View>

        <View style={styles.sentenceInput}>
          <Text style={styles.staticText}>I did</Text>
          <TextInput
            style={styles.inlineInput}
            keyboardType="numeric"
            placeholder={getUnitLabel()}
            value={inputWeight}
            onChangeText={setInputWeight}
          />
          <Text style={styles.staticText}>for</Text>
          <TextInput
            style={styles.inlineInput}
            keyboardType="numeric"
            placeholder="10"
            value={reps}
            onChangeText={setReps}
          />
          <Text style={styles.staticText}>reps</Text>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.actionsCol} />
          <View style={[styles.actionsCol, { alignItems: 'center' }]}>
            <Button title="Reset" onPress={clearInputs} color="#888" />
          </View>
          <View style={[styles.actionsCol, styles.toggleInline]}>
            <Text style={styles.toggleLabel}>{getUnitLabel()}</Text>
            <Switch value={useLbs} onValueChange={toggleUnits} />
          </View>
        </View>

        {rawOneRM > 0 && <View style={styles.rmGrid}>{renderRMGrid()}</View>}
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  resultBox: {
    marginTop: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 200,
  },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between' },
  resultLabel: { fontSize: 20, fontWeight: 'bold', color: '#444', marginRight: 10 },
  resultValue: { fontSize: 20, fontWeight: '600', color: '#222' },
  sentenceInput: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  staticText: { fontSize: 18, marginHorizontal: 4 },
  inlineInput: {
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 18,
    minWidth: 60,
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  toggleInline: { flexDirection: 'row', alignItems: 'center' },
  toggleLabel: { fontSize: 16, marginRight: 6 },
  rmGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  gridBox: {
    width: '40%',
    minWidth: 140,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#eef3f7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
  },
  gridLabel: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 2 },
  gridValue: { fontSize: 16, fontWeight: '500', color: '#222' },
  actionsCol: { flex: 1 },
});
