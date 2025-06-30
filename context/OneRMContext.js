// OneRMContext.js
import React, { createContext, useState } from 'react';

export const OneRMContext = createContext();

export const OneRMProvider = ({ children }) => {
  const [globalOneRM, setGlobalOneRM] = useState(0);
  const [roundTo2_5, setRoundTo2_5] = useState(false);
  const [roundTo5, setRoundTo5] = useState(false);

  return (
    <OneRMContext.Provider
      value={{
        globalOneRM,
        setGlobalOneRM,
        roundTo2_5,
        setRoundTo2_5,
        roundTo5,
        setRoundTo5,
      }}
    >
      {children}
    </OneRMContext.Provider>
  );
};
