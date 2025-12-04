import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

const renderPercentTable = () => {
  const value70 = useLbs ? convertToLbs(rawOneRM * 0.7) : rawOneRM * 0.7;
  const value77_5 = useLbs ? convertToLbs(rawOneRM * 0.775) : rawOneRM * 0.775;
  const value85 = useLbs ? convertToLbs(rawOneRM * 0.85) : rawOneRM * 0.85;

  return (
    <>
      <View style={styles.percentRow}>
        <Text style={styles.percentLabel}>5x5</Text>
        <Text style={styles.percentValue}>
          {value70.toFixed(0)} {getUnitLabel()}
        </Text>
        <Text style={styles.percentDetail}>
        (70%)
        </Text>
      </View>

      <View style={styles.percentRow}>
        <Text style={styles.percentLabel}>4x4</Text>
        <Text style={styles.percentValue}>
          {value77_5.toFixed(0)} {getUnitLabel()} 
        </Text>
        <Text style={styles.percentDetail}>
        (77.5%)
        </Text>
      </View>

      <View style={styles.percentRow}>
        <Text style={styles.percentLabel}>3x3</Text>
        <Text style={styles.percentValue}>
          {value85.toFixed(0)} {getUnitLabel()}
        </Text>
        <Text style={styles.percentDetail}>
          (85%)
        </Text>
      </View>
    </>
  );
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
        {rawOneRM > 0 && (
  <View style={{ marginTop: 8 }}>
    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 6, textAlign: 'center' }}>
      SBD Load Guide
    </Text>
    <View style={styles.percentTable}>{renderPercentTable()}</View>
  </View>
)}

      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginTop: 8 },
  resultBox: {
    marginTop: 24,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 180,
  },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between' },
  resultLabel: { fontSize: 18, fontWeight: 'bold', color: '#444', marginRight: 8 },
  resultValue: { fontSize: 18, fontWeight: '600', color: '#222' },
  sentenceInput: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  staticText: { fontSize: 16, marginHorizontal: 3 },
  inlineInput: {
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 16,
    minWidth: 50,
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
  toggleInline: { flexDirection: 'row', alignItems: 'center' },
  toggleLabel: { fontSize: 14, marginRight: 4 },
  rmGrid: {
  marginTop: 12,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between', // distribute evenly
  gap: 2,
},
gridBox: {
  width: '32%',       // roughly 3 per row
  minWidth: 100,        // remove minWidth to allow compact layout
  marginVertical: 6,  // smaller vertical spacing
  paddingVertical: 8, // smaller padding inside box
  paddingHorizontal: 2,
  backgroundColor: '#eef3f7',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#bbb',
  alignItems: 'center',
},
gridLabel: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 1 },
gridValue: { fontSize: 16, fontWeight: '500', color: '#222' },

  actionsCol: { flex: 1 },
  percentTable: {
  alignSelf: 'center',          // center the table and shrink to content
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingVertical: 6,
  paddingHorizontal: 12,
  backgroundColor: '#f9f9f9',
},

  percentRow: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingVertical: 4,       // row takes full width of its container
},

  percentLabel: { fontSize: 16, fontWeight: '500', color: '#444' },
  percentValue: { marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#222' },
  percentDetail: { marginLeft: 8, fontSize: 14, fontWeight: '400', color: '#333' },
});

