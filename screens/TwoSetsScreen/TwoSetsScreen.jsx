import React, { useState, useEffect, useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import SetTable from '../../components/SetTable/SetTable';
import { OneRMContext } from '../../context/OneRMContext';

export default function TwoSetsScreen() {

  const { globalOneRM } = useContext(OneRMContext)

  const [oneRM, setOneRM] = useState(globalOneRM ?? '');

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

    const tenRM = parsed1RM / (1 + 10 / 30);
    const sixRM = parsed1RM / (1 + 6 / 30);

    const set1 = {
      set: 1,
      load: roundLoad(tenRM),
      loadType: '10RM',
      reps: 8,
      rir: 2,
    };

    const set2 = {
      set: 2,
      load: roundLoad(sixRM),
      loadType: '6RM',
      reps: 6,
      rir: 0,
    };

    return [set1, set2];
  };

  const data = getSetData(oneRM);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.title}>Ramp Sets</Text>
  <Text style={styles.description}> {/* Add your description here */}
    RIR: 2 → 0 {'\n'}
    Reps: 8, 6
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
      <View style={styles.toggleRow}>
        <Text>Round down to nearest 2.5 kg</Text>
        <Switch value={roundTo2_5} onValueChange={onToggle2_5} />
      </View>
      <View style={styles.toggleRow}>
        <Text>Round down to nearest 5.0 kg</Text>
        <Switch value={roundTo5} onValueChange={onToggle5} />
      </View>
      
        <View style={styles.divider} />
      <View style={styles.footer}>
      <Text style={styles.subtitle}>
        
  Why choose 2 sets? {/* You can customize this per screen */}
</Text>
<Text style={styles.subdescription}>
   Best for isolation movements, time efficiency, or exercises you’re maintaining. Works well when intensity is high (low RIR), or as accessory volume in a dense program. {/* Fill in your own notes */}
</Text>
</View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18 },
  input: { borderWidth: 1, padding: 10, fontSize: 18, marginTop: 10 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    gap: "15",
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
    position: 'absolute',
    bottom: 170,
    left: 20,
    right: 0,
    alignItems: 'center',       // center horizontally
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
},
footer: {
  position: 'absolute',
  bottom: 40,
  left: 0,
  right: 0,
  alignItems: 'center',       // center horizontally
  paddingHorizontal: 20,
},
subtitle: {
  fontSize: 18,
  fontWeight: '600',
  marginTop: 100,
  marginBottom: 4,
  textAlign: 'center',
},
subdescription: {
  fontSize: 15,
  color: '#666',
  textAlign: 'center',
  paddingHorizontal: 10,
  marginBottom: 20,
}, 

});
