import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  return (
    <AppContext.Provider
      value={{
        currentDialogue,
        setCurrentDialogue,
        recording,
        setRecording,
        audioBlob,
        setAudioBlob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
