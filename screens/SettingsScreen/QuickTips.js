import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

export default function QuickTips({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👋 Welcome!</Text>

      <Text style={styles.sectionTitle}>⚡️ How to Use This App</Text>
      <Text style={styles.body}>
        <Text style={{ fontWeight: 'bold' }}>
          1️⃣ Choose Your Training Focus & Set Layout
        </Text>
        {'\n'}This helps the app build your sets structure. You can update it
        anytime in Settings.
        <Text style={{ fontWeight: 'bold' }}>
          {'\n\n'}❓ Don’t Know Your 1 Rep Max?
        </Text>
        {'\n'}Use the built-in 1RM calculator to get an estimated starting
        weight for each set.
        <Text style={{ fontWeight: 'bold' }}>
          {'\n\n'}2️⃣ Head to Your Set Tabs
        </Text>
        {'\n'}Each tab shows your target reps, RIR, and weight. You can update
        your 1RM here anytime for quick adjustments.
        <Text style={{ fontWeight: 'bold' }}>{'\n\n'}🚀 Tip:</Text> Use this
        app as a fast and simple way to apply progressive overload. Just
        slightly increase your 1RM next time — and let the app handle your new
        targets.
      </Text>

      <View style={styles.divider} />

      <Button title="📋 Show Training Tips" onPress={() => setModalVisible(true)} />

      <View style={styles.divider} />

      <Button
        title="📘 See Full Training Guide!"
        onPress={() => navigation.navigate('SetupHelper')}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>🔥 Training Tips</Text>

              <Text style={styles.sectionTitle}>💪 Hypertrophy</Text>
              <Text style={styles.body}>
                • Fewer sets (1–2){'\n'}
                • Heavier reps (5–8){'\n'}
                • Train close to failure (0–1 RIR)
              </Text>

              <Text style={styles.sectionTitle}>🏋️ Strength</Text>
              <Text style={styles.body}>
                • Multiple explosive sets (3+){'\n'}
                • Wider rep range (3–10){'\n'}
                • Stay far from failure (3+ RIR)
              </Text>

              <Text style={styles.sectionTitle}>⚡ Hybrid</Text>
              <Text style={styles.body}>
                • Mix of 2–4 sets, 3–8 reps{'\n'}
                • Alternate RIR based on lift (0–5 RIR){'\n'}
                • Blend explosive work with controlled effort
              </Text>

              <View style={{ marginTop: 20 }}>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 0,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
});
