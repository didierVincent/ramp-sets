import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Welcome to Ramp Sets</Text>
      <Text style={styles.subtitle}>
        Build smarter workouts in seconds. This app uses your 1RM to generate customised sets based on your training goal.
      </Text>
      <Text style={styles.subtitleSmall}>
        Choose between strength, hypertrophy, or hybrid — or take full control and adjust every rep, RIR, and set layout yourself.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Walkthrough')}>
        <Text style={styles.buttonText}>🚀 Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#0D0106',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D73028',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#F0F0F0',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitleSmall: {
    fontSize: 14,
    color: '#B0AEBB',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4E52BE',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
