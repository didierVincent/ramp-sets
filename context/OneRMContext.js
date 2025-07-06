// context/OneRMContext.js
import React, { createContext, useState } from 'react';

export const OneRMContext = createContext();

export const OneRMProvider = ({ children }) => {
  // 📦 Core state (always stored in kg)
  const [rawOneRM, setRawOneRM] = useState(0);
  const [setsOneRM, setSetsOneRM] = useState(0);

  // ⚙️ UI/UX toggles
  const [useBodyweightMode, setUseBodyweightMode] = useState(false);
  const [bodyweight, setBodyweight] = useState('88'); // string for input
  const [useLbs, setUseLbs] = useState(false);

  // 🔁 Conversion functions
  const convertToLbs = (kg) => kg * 2.20462;
  const convertToKg = (lbs) => lbs / 2.20462;

  // 🧠 Shared helper functions
  const getUnitLabel = () => (useLbs ? 'lbs' : 'kg');

  const convertForDisplay = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '0';
    return useLbs ? convertToLbs(num).toFixed(0) : num.toFixed(0);
  };

  const calculate1RM = (weight, reps) => {
    if (weight > 0 && reps > 0) {
      return reps === 1 ? weight : weight * (1 + reps / 30);
    }
    return 0;
  };

  const setOneRMFromCalc = (value) => {
    setRawOneRM(value);
    setSetsOneRM(value);
  };

  // ✨ Input formatting helpers
  const formatDisplayValue = (kgVal, useLbsFlag = useLbs) => {
    if (!kgVal || kgVal <= 0) return '';
    const val = useLbsFlag ? convertToLbs(kgVal) : kgVal;
    return Math.round(val).toString();
  };

  const sanitizeInput = (text) => text.replace(/[^0-9.]/g, '');

  const parseToKg = (val, useLbsFlag = useLbs) => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return 0;
    return useLbsFlag ? convertToKg(num) : num;
  };

  const toggleUnits = () => {
    setUseLbs((prev) => !prev);
  };

  // Add default structure for 2–5 sets
const [userSetSettings, setUserSetSettings] = useState({
  2: [
    { reps: 18, rir: 2 },
    { reps: 6, rir: 0 },
  ],
  3: [
    { reps: 7, rir: 3 },
    { reps: 6, rir: 2 },
    { reps: 5, rir: 0 },
  ],
  4: [
    { reps: 8, rir: 4 },
    { reps: 7, rir: 3 },
    { reps: 6, rir: 1 },
    { reps: 5, rir: 0 },
  ],
  5: [
    { reps: 7, rir: 4 },
    { reps: 7, rir: 3 },
    { reps: 6, rir: 2 },
    { reps: 6, rir: 1 },
    { reps: 5, rir: 0 },
  ]
});

const setSetSettings = (setCount, newSettings) => {
  setUserSetSettings((prev) => ({
    ...prev,
    [setCount]: newSettings,
  }));
};


// Helper function to get RM based on reps and rir
const getRMFromRepsAndRIR = (reps, rir) => {
  const targetReps = reps + rir;
  return targetReps <= 0 ? null : targetReps;
};


const getSettings = () => JSON.parse(JSON.stringify(userSetSettings));

return (
  <OneRMContext.Provider
    value={{
      // State
      rawOneRM, setRawOneRM,
      setsOneRM, setSetsOneRM,
      useBodyweightMode, setUseBodyweightMode,
      bodyweight, setBodyweight,
      useLbs, setUseLbs,

      // Conversion
      convertToLbs, convertToKg,

      // Display
      getUnitLabel, convertForDisplay,
      calculate1RM, setOneRMFromCalc,

      // Helpers
      formatDisplayValue, sanitizeInput, parseToKg,
      toggleUnits,

      // Settings
      userSetSettings,
      setSetSettings,
      getRMFromRepsAndRIR,
      getSettings,
    }}
  >
    {children}
  </OneRMContext.Provider>
);

};
