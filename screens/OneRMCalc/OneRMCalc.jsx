import React, { useState, useEffect, useContext } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

import { OneRMContext } from '../../context/OneRMContext';

export default function OneRMCalculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [result, setResult] = useState('0');

  const { setGlobalOneRM } = useContext(OneRMContext);

  
  useEffect(() => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (w > 0 && r > 0) {
      const oneRM = w * (1 + r / 30);
      const oneRMString = oneRM.toFixed(1);
      setResult(oneRM.toFixed(1));
      setGlobalOneRM(oneRMString);
    } else {
      setResult('0');
    }
  }, [weight, reps]);

  const clearInputs = () => {
    setWeight('');
    setReps('');
    setResult('0');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>1-Rep Max Calculator</Text>

        <View style={styles.resultBox}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Your 1RM = </Text>
            <Text style={styles.resultValue}>{result} kg</Text>
          </View>
        </View>

        <View style={styles.sentenceInput}>
          <Text style={styles.staticText}>I did</Text>
          <TextInput
            style={styles.inlineInput}
            keyboardType="numeric"
            placeholder="kg"
            value={weight}
            onChangeText={setWeight}
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

        <View style={styles.clearButton}>
          <Button title="Reset" onPress={clearInputs} color="#888" />
        </View>

        {result !== '—' && result !== '0' && (
          <View style={styles.rmGrid}>
            {[...Array(9)].map((_, i) => {
              const reps = i + 2;
              const est = (parseFloat(result) / (1 + reps / 30)).toFixed(1);
              return (
                <View key={reps} style={styles.gridBox}>
                  <Text style={styles.gridLabel}>{reps}RM</Text>
                  <Text style={styles.gridValue}>{est} kg</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultBox: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 200,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginRight: 10,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  sentenceInput: {
    position: 'absolute',
    top: 180,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  staticText: {
    fontSize: 18,
    marginHorizontal: 4,
  },
  inlineInput: {
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 18,
    minWidth: 60,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    top: 240,
    alignSelf: 'center',
    width: 100,
  },
  rmGrid: {
    position: 'absolute',
    top: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    left: 0,
    right: 0,
    paddingBottom: 150,
  },
  gridBox: {
    width: '40%',
    minWidth: 140,
    marginVertical: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eef3f7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
});