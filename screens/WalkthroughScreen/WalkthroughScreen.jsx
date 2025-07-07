import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';

export default function WalkthroughScreen({ navigation }) {
  const { applyDefaultSettings, setUserGoal, setActiveSetScreens } = useContext(OneRMContext);

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(null);
  const [setCounts, setSetCounts] = useState([]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleComplete = () => {
    setUserGoal(goal);
    setActiveSetScreens(setCounts.sort((a, b) => a - b));
    applyDefaultSettings(goal, setCounts);
    navigation.replace('Back'); // Go to main app
  };

  const toggleSetCount = (count) => {
    const isSelected = setCounts.includes(count);
    let newSetCounts;
    if (isSelected) {
      newSetCounts = setCounts.filter((c) => c !== count);
    } else {
      newSetCounts = [...setCounts, count];
    }
    setSetCounts(newSetCounts.sort((a, b) => a - b));
  };

const renderGoalStep = () => (
    <>
      <Text style={styles.title}>What's your training focus?</Text>
      <Text style={styles.subtitle}>
        We'll auto-build your sets accordingly.
        </Text>
        <Text style={styles.subtitleSmall}>
        You can fine-tune reps and RIR later.
      </Text>
        {/* <Text style={styles.subtitleSmall}>
        Differences in reps & proximity to failure (RIR)
      </Text> */}
      <TouchableOpacity
  style={[styles.option, goal === 'Strength' && styles.selectedOption]}
  onPress={() => setGoal('Strength')}
  activeOpacity={0.7}
>
  <Text style={[styles.optionText, goal === 'Strength' && styles.selectedText]}>
    Strength
  </Text>
  <Text style={[styles.option, styles.middleDesc, goal === 'Strength' && styles.selectedText]}>
    Low reps (3–6) with less fatigue for maximum force development.
    </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.option, goal === 'Hypertrophy' && styles.selectedOption]}
  onPress={() => setGoal('Hypertrophy')}
  activeOpacity={0.7}
>
  <Text style={[styles.optionText, goal === 'Hypertrophy' && styles.selectedText]}>
    Hypertrophy
  </Text>
  <Text style={[styles.option, styles.middleDesc, goal === 'Hypertrophy' && styles.selectedText]}>
    Moderate reps (5–8), near failure to maximise muscle growth.
    </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.option, goal === 'Hybrid' && styles.selectedOption]}
  onPress={() => setGoal('Hybrid')}
  activeOpacity={0.7}
>
  <Text style={[styles.optionText, goal === 'Hybrid' && styles.selectedText]}>
    Hybrid
  </Text>
  <Text style={[styles.option, styles.middleDesc, goal === 'Hybrid' && styles.selectedText]}>
    Blend of strength and size using varied reps (3–8) and fatigue.
    </Text>
</TouchableOpacity>

      <View style={styles.navRow}>
        <View />
        <Button title="Next" disabled={!goal} onPress={handleNext} color="#007AFF" />
      </View>
    </>
  );

  const renderSetCountStep = () => (
      <>
        <Text style={styles.title}>Choose your set layouts.</Text>
        <Text style={styles.subtitle}>
          How many sets do you usually train with?
          </Text>
          <Text style={styles.subtitleSmall}>
          Set-up multiple layouts to switch between.
        </Text>
        {[2, 3, 4, 5].map((count) => {
          const isSelected = setCounts.includes(count);
          return (
            <TouchableOpacity
              key={count}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => toggleSetCount(count)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                {count} Sets
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.navRow}>
          <Button title="Back" onPress={handleBack} color="#007AFF" />
          <Button
            title="Next"
            disabled={setCounts.length === 0}
            onPress={handleNext}
            color="#007AFF"
          />
        </View>
      </>
    );

    const renderCustomizeStep = () => (
        <>
          <Text style={styles.title2}>Done!</Text>
                <Text style={styles.subtitle}>
                  Don't waste time figuring out how heavy, how many reps or how hard to push yourself anymore.
                  </Text>
                  <Text style={styles.subtitleSmall}>
                  {'\n'}More info on how to use the app inside.
                </Text>
            
          <View style={[styles.navRow, { justifyContent: 'space-around' }]}>
            <Button title="Back" onPress={handleBack} color="#007AFF" />
            <Button title="Save" onPress={handleComplete} color="#007AFF" />
          </View>
        </>
      );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {step === 1 && renderGoalStep()}
        {step === 2 && renderSetCountStep()}
        {step === 3 && renderCustomizeStep()}
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
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
});
