import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';

const LAYOUTS = [
  {
    key: 'hybrid-3',
    title: 'Strength & Size: 3-Set',
    desc: 'Heavy top set with back-off sets. Ideal for fast strength and muscle gains with balanced fatigue. Best for compounds and moderate-effort accessories.',
  },
  {
    key: 'hypertrophy-2',
    title: 'Muscle Growth: 2-Set',
    desc: 'Straight sets near failure. Emphasises high mechanical tension, best for isolation lifts, managing fatigue, and packing in effective volume efficiently.',
  },
  {
    key: 'hypertrophy-3',
    title: 'Muscle Growth: 3-Set',
    desc: 'More set volume for a stronger hypertrophy stimulus, best for when fatigue is less of a concern.',
  },
  {
    key: 'hybrid-2',
    title: 'Strength & Size: 2-Set',
    desc: 'Heavy top set & back-off set structure. Quick for effective strength and size development.',
  },
  {
    key: 'strength-5',
    title: 'Max Strength: 5-Set',
    desc: 'Multiple heavy sets with minimum fatigue to drive neural gains, bar speed, and movement proficiency. Ideal for refining skill under load and building top-end strength.',
  },
];


export default function WalkthroughScreen({ navigation }) {
  const { setActiveSetScreens } = useContext(OneRMContext);

  const [step, setStep] = useState(1);
  const [selectedLayouts, setSelectedLayouts] = useState([]);

  const toggleLayout = (key) => {
    const newList = selectedLayouts.includes(key)
      ? selectedLayouts.filter((k) => k !== key)
      : [...selectedLayouts, key];
    setSelectedLayouts(newList);
  };

  const handleComplete = async () => {
    setActiveSetScreens(selectedLayouts);
    try {
      await AsyncStorage.setItem('ACTIVE_SET_SCREENS', JSON.stringify(selectedLayouts));
    } catch (err) {
      console.warn('Failed to save selected screens:', err);
    }
    navigation.replace('Back'); // Replace with your main app screen
  };

  const renderIntroStep = () => (
    <>
      <Text style={styles.title}>Welcome to Ramp Sets</Text>
      <Text style={styles.subtitle}>
        This app helps you select optimal loads, reps and effort using scientifically validated methods.
      </Text>
      <Text style={styles.subtitleSmall}>
        You’ll choose a few preset set layouts now — you can customize them later.
      </Text>
      <View style={styles.navRow}>
        <View />
        <Button title="Next" onPress={() => setStep(2)} color="#007AFF" />
      </View>
    </>
  );

  const renderSelectLayoutsStep = () => (
  <>
    <Text style={styles.title}>Choose Your Set Screens</Text>
    <Text style={styles.subtitle}>You can always add or edit later.</Text>

    <View style={styles.scrollContainer}>
      <ScrollView
        style={styles.scrollInner}
        contentContainerStyle={{ padding: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {LAYOUTS.map(({ key, title, desc }) => {
          const isSelected = selectedLayouts.includes(key);
          return (
            <TouchableOpacity
              key={key}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => toggleLayout(key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                {title}
              </Text>
              <Text style={styles.middleDesc}>{desc}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>

    <View style={styles.navRow}>
      <Button title="Back" onPress={() => setStep(1)} color="#007AFF" />
      <Button
        title="Next"
        onPress={() => setStep(3)}
        disabled={selectedLayouts.length === 0}
        color="#007AFF"
      />
    </View>
  </>
);


  const renderDoneStep = () => (
    <>
      <Text style={styles.title2}>You're all set!</Text>
      <Text style={styles.subtitle}>
        Your selected screens are saved. You can customize loads, reps and RIR inside the app at any time.
      </Text>
      <Text style={styles.subtitleSmall}>Train smarter, not just harder.</Text>
      <View style={styles.navRow}>
        <Button title="Back" onPress={() => setStep(2)} color="#007AFF" />
        <Button title="Finish" onPress={handleComplete} color="#007AFF" />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {step === 1 && renderIntroStep()}
        {step === 2 && renderSelectLayoutsStep()}
        {step === 3 && renderDoneStep()}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  content: {
    paddingTop: 50,
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 26,
    color: '#999',
    paddingHorizontal: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  title2: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
    marginTop: 102,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleSmall: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    backgroundColor: '#007AFF22',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#222',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: '700',
    
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  middleDesc: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#999',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
  scrollContainer: {
  maxHeight: 450,
  borderWidth: 2,
  borderColor: '#ddd',
  borderRadius: 12,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 4,
  marginBottom: 20,
},

scrollInner: {
  borderRadius: 12,
},

});
