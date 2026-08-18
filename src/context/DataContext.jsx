import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoreData, updateStoreSection, resetToFactoryDefaults, exportFullDataBackup, importDataBackup } from '../services/contentStore';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [store, setStore] = useState(getStoreData);

  useEffect(() => {
    const handleStoreUpdate = () => {
      setStore(getStoreData());
    };

    window.addEventListener('livgruha_store_updated', handleStoreUpdate);
    window.addEventListener('storage', handleStoreUpdate);
    return () => {
      window.removeEventListener('livgruha_store_updated', handleStoreUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, []);

  const updateSection = (sectionKey, data) => {
    const success = updateStoreSection(sectionKey, data);
    if (success) {
      setStore(getStoreData());
    }
    return success;
  };

  const resetDefaults = () => {
    resetToFactoryDefaults();
    setStore(getStoreData());
  };

  const exportBackup = () => {
    exportFullDataBackup();
  };

  const importBackup = (jsonStr) => {
    const res = importDataBackup(jsonStr);
    if (res.success) {
      setStore(getStoreData());
    }
    return res;
  };

  return (
    <DataContext.Provider value={{
      brand: store.brand,
      packages: store.packages,
      projects: store.projects,
      rooms: store.rooms,
      cities: store.cities,
      testimonials: store.testimonials,
      banners: store.banners,
      advantages: store.advantages,
      faqs: store.faqs,
      updateSection,
      resetDefaults,
      exportBackup,
      importBackup,
      refreshData: () => setStore(getStoreData())
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    return {
      ...getStoreData(),
      updateSection: updateStoreSection,
      resetDefaults: resetToFactoryDefaults,
      exportBackup: exportFullDataBackup,
      importBackup: importDataBackup,
      refreshData: () => {}
    };
  }
  return context;
}
