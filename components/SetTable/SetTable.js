import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SetTable({ data }) {
  if (!data || data.length === 0) {
    return <Text style={styles.placeholder}>(use 1RM calc, or enter 1RM above)</Text>;
  }

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.cellHeader}>Set</Text>
        <Text style={styles.cellHeader}>Load</Text>
        <Text style={styles.cellHeader}>Reps</Text>
        <Text style={styles.cellHeader}>RM</Text>
        <Text style={styles.cellHeader}>RIR</Text>
      </View>
      {data.map((set, i) => (
        <View key={i} style={styles.dataRow}>
          <Text style={styles.cell}>{set.set}</Text>
          <Text style={styles.cell}>{set.load}kg</Text>
          <Text style={styles.cell}>x{set.reps}</Text>
          <Text style={styles.cell}>{set.loadType}</Text>
          <Text style={styles.cell}>@{set.rir}RIR</Text>
          
          
        </View>
        
      ))}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
  },
  dataRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 2,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  placeholder: {
    marginTop: 20,
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
    width: '100%',
  },
});
