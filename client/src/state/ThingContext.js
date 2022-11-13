import { useState, createContext, useContext } from 'react';

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

const ThingContext = createContext(null);
export const ThingContextProvider = ({ children }) => {
  <ThingContext.Provider value={useState(null)}>
    {children}
  </ThingContext.Provider>
}