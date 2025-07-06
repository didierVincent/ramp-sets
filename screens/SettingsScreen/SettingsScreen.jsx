import React, { useContext, useState } from 'react';
import { View, Button } from 'react-native';
import { OneRMContext } from '../../context/OneRMContext';
import SetSettingsModal from './setSettingsModal';

export default function SettingsScreen() {
  const { userSetSettings, setSetSettings } = useContext(OneRMContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModalFor = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentIndex(null);
  };

  const saveSettings = (newSettings) => {
    setSetSettings(currentIndex, newSettings);
    closeModal();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {[2, 3, 4, 5].map((n) => (
        <Button key={n} title={`Change ${n} Sets`} onPress={() => openModalFor(n)} />
      ))}

      {currentIndex !== null && (
        <SetSettingsModal
          visible={modalVisible}
          onClose={closeModal}
          onSave={saveSettings}
          initialSettings={userSetSettings[currentIndex]}
        />
      )}
    </View>
  );
}
