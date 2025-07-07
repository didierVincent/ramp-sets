import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SetupHelper() {

  const navigation = useNavigation();


useLayoutEffect(() => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#4E52BE', // your new header color
    },
    headerTintColor: '#FFFFFF', // text/icon color
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
}, [navigation]);

  const [expandedSection, setExpandedSection] = useState('step1');

  const isExpanded = (key) => expandedSection === key;
  const toggle = (key) => {
    setExpandedSection(prev => (prev === key ? null : key));
  };

  const SectionToggle = ({ label, id }) => (
    <TouchableOpacity onPress={() => toggle(id)} style={styles.stepToggle}>
      <Text style={styles.stepTitle}>
        {label} {isExpanded(id) ? '▲' : '▼'}
      </Text>
    </TouchableOpacity>
  );

  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛠️ Ultimate Training Guide</Text>

      {/* Step 1 */}
      <SectionToggle label="1️⃣ Understand Your Focus" id="step1" />
      {isExpanded('step1') && (
        <View style={styles.section}>
          <Text style={styles.heading}>🏋️ Strength</Text>
          <Text style={styles.body}>
            Focus on developing power, coordination, and technique by progressively lifting heavier weights over time. Maintain higher RIR (3–7) to preserve explosiveness and avoid burnout. Every set should be done with full control and maximal intent, not to failure.
          </Text>

          <Text style={styles.heading}>💪 Hypertrophy</Text>
          <Text style={styles.body}>
            Focus on muscle growth through mechanical tension and consistent effort. Use moderate reps (5–8) and low RIR (0–2). Don’t chase reps — prioritize form, control, and staying close to failure for an optimal muscle-building stimulus.
          </Text>

          <Text style={styles.heading}>⚡ Hybrid</Text>
          <Text style={styles.body}>
            Combine strength and hypertrophy strategies. Use lower RIR (0–2) for accessories and higher RIR (3–5) for compounds. Adjust rep range based on movement type (3–8 reps). Ideal for general fitness, longevity, or when you want both size and strength.
          </Text>
        </View>
      )}

      {/* Step 2 */}
      <SectionToggle label="2️⃣ What is RIR? (Reps In Reserve)" id="step2" />
      {isExpanded('step2') && (
        <View style={styles.section}>
          <View style={styles.infoBlock}>
            <Text style={styles.body}>
             ℹ️ <Text style={{ fontWeight: 'bold' }}>RIR (Reps In Reserve)</Text> is the number of full reps you could still perform before reaching failure. {'\n'}{'\n'}
             For example, stopping a set with 2 reps left in the tank means you're at 2 RIR. Reaching the point where you can’t complete another clean rep is 0 RIR. {'\n'}{'\n'}
             RIR is the most important variable for managing stimulus, performance, and fatigue. Controlling how close you get to failure is key to training effectively for both strength and hypertrophy.
            </Text>
          </View>
        </View>
      )}

     

      {/* Step 4 */}
      <SectionToggle label="3️⃣  How Many Sets should I do?" id="step3" />
      {isExpanded('step3') && (
        <View style={styles.section}>
          <Text style={styles.subheading}>🧩 Why choose 2 sets?</Text>
          <Text style={styles.body}>
            <Text style={{ fontWeight: 'bold' }}>Hypertrophy</Text> - Best for isolation movements, time efficiency, or exercises you’re maintaining. Works well when intensity is high (low RIR), or as accessory volume in a dense program.
          </Text>

          <Text style={styles.subheading}>⚖️ Why choose 3 sets?</Text>
          <Text style={styles.body}>
            <Text style={{ fontWeight: 'bold' }}>Hybrid</Text> - A balanced option for most lifts. Great for combining intensity and volume without accumulating excessive fatigue. Ideal for moderate effort compounds and accessories.
          </Text>

          <Text style={styles.subheading}>🏗️ Why choose 4 sets?</Text>
          <Text style={styles.body}>
            <Text style={{ fontWeight: 'bold' }}>Strength / Hybrid</Text> - Use for priority lifts where strength or skill development is the focus.
                Allows more quality practice (higher RIR early), making it best for squats,
                presses, hinges, and rows you want to progress long-term.
          </Text>

          <Text style={styles.subheading}>🔥 Why choose 5 sets?</Text>
          <Text style={styles.body}>
            <Text style={{ fontWeight: 'bold' }}>Advanced Strength</Text> - Ideal for advanced progression and work capacity. Provides volume and intensity to develop strength and endurance. Best for key lifts focused on consistent overload and technique over time.
          </Text>
        </View>
      )}

       {/* Step 3 */}
      <SectionToggle label="4️⃣ What Reps & RIR should I do?" id="step4" />
      {isExpanded('step4') && (

        <View style={styles.section}>
          
          <View style={styles.infoBlock}>
            <Text style={styles.heading}>🔢 Reps Matter Less Than RIR</Text>
            <Text style={styles.body}>
              You only need about 5 "stimulating reps" before failure to build muscle. That means:
              {'\n'}{'\n'}🔹 Lower rep sets (e.g. 5–8) can be optimal when safe and controlled.
              {'\n\n'}🔹 Higher reps can work, but they add more fatigue and are harder to track precisely.
              {'\n\n'}<Text style={{ fontWeight: 'bold' }}>Choose a rep range that lets you train near failure with good form.</Text>
            </Text>
          </View>
          
          <View style={styles.warningBlock}>
            <Text style={styles.body}>
                <Text style={styles.heading}>⚠️ Sets taken closer to failure create more fatigue and reduce strength performance.{'\n'}{'\n'}</Text>
            For strength, avoid failure. You will benefitUse more sets at higher RIR. 
            {'\n\n'}For hypertrophy, training close to failure (0–2 RIR) is essential for growth. 
            {'\n\n'}Fatigue and intensity needs to be carefully managed during exercise. 
            {'\n\n'}This is key to getting the most out of your workouts.
            </Text>
          </View>

          <View style={styles.tipBlock}>
            <Text style={styles.tipTitle}>💡 Pro Tip</Text>
            <Text style={styles.body}>
              For hypertrophy, 5–8 reps with 0–2 RIR offers a great balance of stimulus, recoverability, and consistency.
            </Text>
          </View>
        </View>
      )}

      {/* Training Tips Table */}
      <SectionToggle label="🔑 Reference Table" id="tips" />
      {isExpanded('tips') && (
        <View style={styles.table}>
          <View style={styles.row}>
            {['Focus', 'Sets', 'Reps', 'RIR'].map((text, idx) => (
              <View key={idx} style={styles.headerCellContainer}>
                <Text style={styles.headerCellText}>{text}</Text>
              </View>
            ))}
          </View>

          {[['Strength', '3+ sets', '3–6 reps', '3–7 RIR'],
            ['Hyper-trophy', '1–3 sets', '5–8 reps', '0–2 RIR'],
            ['Hybrid', '2–4 sets', '3–8 reps', '0–5 RIR']].map((row, idx) => (
              <View key={idx} style={styles.row}>
                {row.map((text, j) => (
                  <View key={j} style={styles.cellContainer}>
                    <Text style={styles.cellText}>{text}</Text>
                  </View>
                ))}
              </View>
          ))}
          
        </View>
      )}<Text>{'\n\n\n\n'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0D0106',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  stepToggle: { marginVertical: 6 },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    padding: 10,
    backgroundColor: '#4E52BE',
    color: '#FFFFFF',
    borderRadius: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 0,
    paddingVertical: 8,
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  body: {
    fontSize: 15,
    color: '#EAEAEA',
    marginBottom: 10,
  },
  infoBlock: {
    backgroundColor: '#6F69A2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  warningBlock: {
    backgroundColor: '#D73028',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipBlock: {
    backgroundColor: '#824686',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  table: { marginVertical: 10 },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
    gap: 2,
  },
  headerCellContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 7,
    backgroundColor: '#934173',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  cellContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2F',
  },
  cellText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#0D0106',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#FFFFFF',
  },
});

