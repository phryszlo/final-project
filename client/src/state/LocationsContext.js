import { useState, createContext, useReducer } from 'react';

// const useStore = () => {
//   const [thing, setThing] = useState('');
//   const [place, setPlace] = useState('');
//   const [quantity, setQuantity] = useState(0);

//   return {
//     thing, place, quantity,
//     addThing: () => setThing('sharpie'),
//     addPlace: () => setPlace('office'),
//     setQ: () => setQuantity(1)
//   }
// }
// const locsReducer = (state, action) => {
//   switch (action.type) {
//     case "FOO":
//       return (state = "Swiss");
//     case "BAR":
//       return (state = "Mozzarella");
//     default:
//       return state;
//   }
// }
const [locations, setLocations] = useState({});

const LocationsContext = createContext({});
export const LocationsContextProvider = ({ children }) => {
  <LocationsContext.Provider value={({ locations, setLocations })}>
    {children}
  </LocationsContext.Provider>
}