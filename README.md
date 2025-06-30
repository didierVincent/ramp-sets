# RIR Ramp Sets App

A mobile app built with **React Native** and **Expo**, designed to help strength training athletes calculate their One Rep Max (1RM) and generate ramp set recommendations based on RIR (Reps In Reserve) logic.

## Features

- **1RM Calculator:** Uses the Epley formula to estimate your 1RM from any submaximal set.
- **Ramp Set Prescriptions:** Generate 2, 3, or 4 ramp sets using RIR-based logic and automatically calculated intensity.
- **Global State Management:** 
  - 1RM result from the calculator updates automatically across all set screens.
  - Rounding options (to nearest 2.5kg or 5kg) persist across tabs.
- **Custom Load Rounding:** Choose between rounding to nearest 2.5 kg or 5 kg for gym-friendly loads.
- **Offline First:** No internet required once installed.

## Screens

- **1RM Calc Tab:** Input your recent set to get your 1RM and a table showing 2–10RM equivalents.
- **2 Sets, 3 Sets, 4 Sets Tabs:** Automatically generate ramp sets based on your current 1RM and chosen rounding method.

## Tech Stack

- **React Native (with Expo)**
- **React Navigation (Bottom Tabs)**
- **Global Context API** for state sharing across screens
