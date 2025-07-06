// screens/OnboardingScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Ramp Sets</Text>
      <Text style={styles.subtitle}>
        We'll help you train smarter with goal-based set recommendations.
      </Text>
      <Text style={styles.subtitleSmall}>
        Choose a training goal and number of sets to get started.
      </Text>

      <Button
        title="Get Started"
        onPress={() => navigation.replace('Walkthrough')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#444',
  },
  subtitleSmall: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#777',
  },
});
