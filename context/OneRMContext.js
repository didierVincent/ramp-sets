import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OneRMContext = createContext();

const USER_SETTINGS_KEY = 'userSetSettings';
const ACTIVE_SET_SCREENS_KEY = 'activeSetScreens';
const BODYWEIGHT_KEY = 'bodyweight';


export const OneRMProvider = ({ children }) => {
  // 📦 Core state (always stored in kg)
  const [rawOneRM, setRawOneRM] = useState(0);
  const [setsOneRM, setSetsOneRM] = useState(0);

  // ⚙️ UI/UX toggles
  const [useBodyweightMode, setUseBodyweightMode] = useState(false);
  const [bodyweight, setBodyweightState] = useState(''); // string for input
  const [useLbs, setUseLbs] = useState(false);

  const setBodyweight = async (val) => {
  setBodyweightState(val); // updates UI immediately

  try {
    await AsyncStorage.setItem(BODYWEIGHT_KEY, String(val));
  } catch (err) {
    console.warn('Failed to save bodyweight:', err);
  }
};

  // Persisted user goal and sets state
  const [userSetSettings, setUserSetSettings] = useState(null);
  const [activeSetScreens, setActiveSetScreens] = useState([]); // default visible sets

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
    return reps === 1
      ? weight
      : (weight * 36) / (37 - reps); // Brzycki formula (used to be Epley)
  }
  return 0;
};


  const calculateLoadFrom1RM = (oneRM, reps) => {
    if (oneRM <= 0 || reps <= 0) return 0;
    if (reps === 1) return oneRM;
    return oneRM / (1 + reps / 30);
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

 
  useEffect(() => {
    const loadAllSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(USER_SETTINGS_KEY);
        const storedActiveSets = await AsyncStorage.getItem(ACTIVE_SET_SCREENS_KEY);
        const storedBodyweight = await AsyncStorage.getItem(BODYWEIGHT_KEY);

        if (storedSettings) {
          setUserSetSettings(JSON.parse(storedSettings));
        } else {
          setUserSetSettings(hyperDefaultSettings);
        }

        if (storedActiveSets) {
          setActiveSetScreens(JSON.parse(storedActiveSets));
        }

        if (storedBodyweight !== null) {
        setBodyweightState(String(storedBodyweight));
      }
      } catch (err) {
        console.warn('Failed to load user settings:', err);
        setUserSetSettings(hyperDefaultSettings);
        setActiveSetScreens([]);
      }
    };

    loadAllSettings();
  }, []);

  // Default templates for applyDefaultSettings
  const strengthDefaultSettings = {
  2: [{ reps: 6, rir: 5 }, { reps: 4, rir: 3 }],
  3: [{ reps: 6, rir: 6 }, { reps: 5, rir: 5 }, { reps: 4, rir: 3 }],
  4: [{ reps: 6, rir: 7 }, { reps: 5, rir: 6 }, { reps: 4, rir: 5 }, { reps: 3, rir: 3 }],
  5: [{ reps: 6, rir: 7 }, { reps: 5, rir: 6 }, { reps: 5, rir: 5 }, { reps: 4, rir: 4 }, { reps: 3, rir: 3 }],
};

const hyperDefaultSettings = {
  2: [{ reps: 8, rir: 2 }, { reps: 6, rir: 0 }],
  3: [{ reps: 8, rir: 2 }, { reps: 7, rir: 1 }, { reps: 6, rir: 0 }],
  4: [{ reps: 8, rir: 2 }, { reps: 7, rir: 2 }, { reps: 6, rir: 1 }, { reps: 5, rir: 0 }],
  5: [{ reps: 8, rir: 2 }, { reps: 7, rir: 2 }, { reps: 6, rir: 1 }, { reps: 6, rir: 1 }, { reps: 5, rir: 0 }],
};

const hybridDefaultSettings = {
  2: [{ reps: 8, rir: 5 }, { reps: 6, rir: 1 }],
  3: [{ reps: 8, rir: 5 }, { reps: 6, rir: 2 }, { reps: 5, rir: 0 }],
  4: [{ reps: 8, rir: 5 }, { reps: 7, rir: 4 }, { reps: 5, rir: 2 }, { reps: 5, rir: 0 }],
  5: [{ reps: 8, rir: 5 }, { reps: 7, rir: 4 }, { reps: 6, rir: 3 }, { reps: 6, rir: 2 }, { reps: 5, rir: 0 }],
};


  // Save individual set settings changes (per setCount)
  const setSetSettings = async (setCount, newSettings) => {
    const updated = {
      ...userSetSettings,
      [setCount]: newSettings,
    };

    setUserSetSettings(updated);

    try {
      await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save user settings:', err);
    }
  };

  // Reset all settings and clear AsyncStorage
  const resetSettings = async () => {
    setUserSetSettings(hyperDefaultSettings);
    setActiveSetScreens([]);

    try {
      await AsyncStorage.removeItem(USER_SETTINGS_KEY);
      await AsyncStorage.removeItem(ACTIVE_SET_SCREENS_KEY);
    } catch (err) {
      console.warn('Failed to reset user settings:', err);
    }
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
        rawOneRM,
        setRawOneRM,
        setsOneRM,
        setSetsOneRM,
        useBodyweightMode,
        setUseBodyweightMode,
        bodyweight,
        setBodyweight,
        useLbs,
        setUseLbs,

        // Conversion
        convertToLbs,
        convertToKg,

        // Display
        getUnitLabel,
        convertForDisplay,
        calculate1RM,
        calculateLoadFrom1RM,
        setOneRMFromCalc,

        // Helpers
        formatDisplayValue,
        sanitizeInput,
        parseToKg,
        toggleUnits,

        // Presets
        hyperDefaultSettings,
        strengthDefaultSettings,
        hybridDefaultSettings,
        
        // Settings
        userSetSettings,
        setSetSettings,
        resetSettings,
        activeSetScreens,
        setActiveSetScreens,

        getRMFromRepsAndRIR,
        getSettings,

        strengthDefaultSettings,
        hyperDefaultSettings,
        hybridDefaultSettings,
      }}
    >
      {children}
    </OneRMContext.Provider>
  );
};
