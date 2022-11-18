import { useState, createContext } from 'react';

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([{}]);
  const [location, setLocation] = useState({});

  return (
    <LocationsContext.Provider value={{
      locations: [locations, setLocations],
      location: [location, setLocation]
    }}
    >
      {children}
    </LocationsContext.Provider >
  );
}