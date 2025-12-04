import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function SetBuilderWalkthroughModal({
  visible,
  onClose,
  onComplete,
  initialGoal = null,
  initialSetCounts = [],
}) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(initialGoal);
  const [setCounts, setSetCounts] = useState(initialSetCounts);

  // Reset modal state when opened or closed
  useEffect(() => {
    if (!visible) {
      setStep(1);
      setGoal(initialGoal);
      setSetCounts(initialSetCounts);
    }
  }, [visible, initialGoal, initialSetCounts]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleComplete = () => {
    // Sort setCounts before submit for consistent ordering
    const sortedSetCounts = [...setCounts].sort((a, b) => a - b);
    onComplete({ goal, setCounts: sortedSetCounts });
    onClose();
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
    Heavy reps (3–5) with less fatigue for maximum force development.
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
    Straight sets (5-8 reps) close to failure to maximise muscle growth.
    </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.option, goal === 'Hybrid' && styles.selectedOption]}
  onPress={() => setGoal('Hybrid')}
  activeOpacity={0.7}
>
  <Text style={[styles.optionText, goal === 'Hybrid' && styles.selectedText]}>
    Hybrid (Reverse Pyramid)
  </Text>
  <Text style={[styles.option, styles.middleDesc, goal === 'Hybrid' && styles.selectedText]}>
    Heavy top set (3–5) for strength, with backoff sets (5–8) for muscle growth. 
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
      <Text style={styles.title}>Done!</Text>
      <Text style={styles.subtitle}>
        Don't waste time figuring out how heavy, how many reps or how hard to push yourself anymore.
        </Text>
        <Text style={styles.subtitleSmall}>
        More info on how to use the app inside.
      </Text>
        
      <View style={[styles.navRow, { justifyContent: 'space-around' }]}>
        <Button title="Back" onPress={handleBack} color="#007AFF" />
        <Button title="Save" onPress={handleComplete} color="#007AFF" />
      </View>
    </>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.modalFullScreen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalContent}>
          {step === 1 && renderGoalStep()}
          {step === 2 && renderSetCountStep()}
          {step === 3 && renderCustomizeStep()}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalFullScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 10,
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
