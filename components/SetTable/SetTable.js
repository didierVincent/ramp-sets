import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';

export default function SetTable({ data, bodyweight }) {
  const { useLbs, convertToLbs, convertToKg, getUnitLabel } = useContext(OneRMContext);

  if (!data || data.length === 0) {
    return <Text style={styles.placeholder}>(use 1RM calc, or enter 1RM above)</Text>;
  }

  const showBodyweight = bodyweight !== null && bodyweight !== '' && !isNaN(bodyweight);
  const unit = getUnitLabel();

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.cellHeader}>Set</Text>
        <Text style={styles.cellHeader}>Load</Text>
        <Text style={styles.cellHeader}>Reps</Text>
        <Text style={styles.cellHeader}>RM</Text>
        <Text style={styles.cellHeader}>RIR</Text>
      </View>

      {data.map((set, i) => {
        let loadKg = parseFloat(set.load);

        // Convert load from kg to lbs if needed
        let displayLoad = useLbs ? convertToLbs(loadKg) : loadKg;

        // Round load nicely
        const roundLoad = (val) => Math.round(val);

        displayLoad = roundLoad(displayLoad);

        // If showing bodyweight split, convert bodyweight to same unit as load display
        let bwDisplay = null;
        let extraLoad = null;
        let totalLoadStr = '';

        if (showBodyweight) {
          const bw = useLbs ? convertToLbs(parseFloat(bodyweight)) : parseFloat(bodyweight);
          bwDisplay = roundLoad(bw);

          if (displayLoad > bwDisplay) {
            extraLoad = roundLoad(displayLoad - bwDisplay);
            totalLoadStr = ` +${extraLoad} ${unit}`;
          } else {
            totalLoadStr = `${displayLoad} ${unit}`;
          }
        } else {
          totalLoadStr = `${displayLoad} ${unit}`;
        }

        return (
          <View key={i} style={styles.dataRow}>
            <Text style={styles.cell}>{set.set}</Text>
            <Text style={styles.cell}>{totalLoadStr}</Text>
            <Text style={styles.cell}>x{set.reps}</Text>
            <Text style={styles.cell}>{set.loadType}</Text>
            <Text style={styles.cell}>@{set.rir}RIR</Text>
          </View>
        );
      })}

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
