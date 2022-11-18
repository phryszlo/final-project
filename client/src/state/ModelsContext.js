import { useState, createContext } from 'react';

export const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
  const [models, setModels] = useState([{}]);
  const [model, setModel] = useState({});

  return (
    <ModelsContext.Provider value={{
      model: [model, setModel],
      models: [models, setModels], 
    }}
    >
      {children}
    </ModelsContext.Provider >
  );
}