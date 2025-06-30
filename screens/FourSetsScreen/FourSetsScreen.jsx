import React, { useState, useEffect, useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import SetTable from '../../components/SetTable/SetTable';
import { OneRMContext } from '../../context/OneRMContext';

export default function FourSetsScreen() {

  const { globalOneRM } = useContext(OneRMContext)

  const [oneRM, setOneRM] = useState('');

  const {
  roundTo2_5,
  setRoundTo2_5,
  roundTo5,
  setRoundTo5
} = useContext(OneRMContext);

  useEffect(() => {
    if (
      globalOneRM !== '0' // <-- only update if not '0'
    ) {
      setOneRM(globalOneRM);
    }
  }, [globalOneRM]);

  const onToggle2_5 = (value) => {
    setRoundTo2_5(value);
    if (value) setRoundTo5(false);
  };

  const onToggle5 = (value) => {
    setRoundTo5(value);
    if (value) setRoundTo2_5(false);
  };

  const roundLoad = (load) => {
    if (roundTo5) {
      return Math.floor(load / 5) * 5;
    }
    if (roundTo2_5) {
      return Math.floor(load / 2.5) * 2.5;
    }
    return Math.round(load);
  };

  const getSetData = (oneRM) => {
    const parsed1RM = parseFloat(oneRM);
    if (!parsed1RM) return [];

    const twelveRM = parsed1RM / (1 + 12 / 30);
    const tenRM = parsed1RM / (1 + 10 / 30);
    const sevenRM = parsed1RM / (1 + 7 / 30);
    const fiveRM = parsed1RM / (1 + 5 / 30);

    return [
      {
        set: 1,
        load: roundLoad(twelveRM),
        loadType: '12RM',
        reps: 8,
        rir: 4,
      },
      {
        set: 2,
        load: roundLoad(tenRM),
        loadType: '10RM',
        reps: 7,
        rir: 3,
      },
      {
        set: 3,
        load: roundLoad(sevenRM),
        loadType: '7RM',
        reps: 6,
        rir: 1,
      },
      {
        set: 4,
        load: roundLoad(fiveRM),
        loadType: '5RM',
        reps: 5,
        rir: 0,
      },
    ];
  };

  const data = getSetData(oneRM);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Ramp Sets</Text>
 <Text style={styles.description}> {/* Add your description here */}
      RIR: 4 → 3 → 1 → 0 {'\n'}
    Reps: 8, 7, 6, 5
    </Text>
    
      <Text style={styles.label}>Ramp Sets based on your 1RM:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={oneRM}
        onChangeText={setOneRM}
        placeholder="1 Rep Max (kg)"
      />
      <SetTable data={data} />

      </View>

      <View style={styles.footer}>
      <View style={styles.toggleRow}>
        <Text>Round down to nearest 2.5 kg</Text>
        <Switch value={roundTo2_5} onValueChange={onToggle2_5} />
      </View>
      <View style={styles.toggleRow}>
        <Text>Round down to nearest 5.0 kg</Text>
        <Switch value={roundTo5} onValueChange={onToggle5} />
      </View>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>
    Why choose 4 sets? {/* You can customize this per screen */}
  </Text>
  <Text style={styles.subdescription}>
     Use for priority lifts where strength or skill development is the focus. Allows more quality practice (higher RIR early), making it best for squats, presses, hinges, and rows you want to progress long-term.
  </Text>
  </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  label: { fontSize: 18 },
  input: { borderWidth: 1, padding: 10, fontSize: 18, marginTop: 10 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    gap: "5",
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
    alignItems: 'center', // center horizontally
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

