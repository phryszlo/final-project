import { Routes, Route } from 'react-router-dom';
// import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from 'react';
import { createMedia } from "@artsy/fresnel";

import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Success from './components/Success';
import Main from './components/Main';
import NavBar from './components/NavBar';
import { getUser } from './utilities/users-service'
import XL from './components/XL';
import EquipmentForm from './components/inventory/Equipment';
import EqTable from './components/inventory/EqTable';
import LocationPage from './components/inventory/LocationPage';
import ModelForm from './components/inventory/ModelForm';

import { LocationsProvider } from "./state/LocationsContext";
import { ModelsProvider } from './state/ModelsContext';
import { getLocations } from './utilities/inventory-service';
import ModelsPage from './components/inventory/ModelsPage';


function App() {
  const [user, setUser] = useState(getUser());

  const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" }
  ];
  const rightItems = [
    { as: "a", content: "Logout", key: "logout" },
    { as: "span", content: `user:  ${user && user.name}`, key: "user" }
  ];



  useEffect(() => {
    console.log(`user on useEff[user] ${JSON.stringify(user)}`)
  }, [user])

  return (
    // <MediaContextProvider>
    <LocationsProvider>
      <ModelsProvider>
        <div className="App">
          {user
            ?
            (
              <div className="content-wrapper !flex !flex-col !w-screen bg-yellow-500">
                <div className="nav-div">
                  <NavBar username={user.name} setUser={setUser} rightItems={rightItems} Media={Media} />
                </div>
                <div className="marquee-div !bg-orange-500 !m-0">
                  <p className="marquee text-indigo-900 font-burtons !mb-1">the final project app</p>
                </div>
                <div className="content-div !mt-12">
                  <Routes>
                    <Route path='/' element={<Success />} />
                    <Route path='/success' element={<Success />} />
                    <Route path='/main' element={<Main />} />
                    <Route path='/xl' element={<XL />} />
                    <Route path='/equipment' element={<EquipmentForm />} />
                    <Route path='/equipment/:id' element={<EquipmentForm />} />
                    <Route path='/equipment/all' element={<EqTable />} />
                    <Route path='/location/' element={<LocationPage />} />
                    <Route path='/location/:id' element={<LocationPage />} />
                    <Route path='/model/' element={<ModelsPage />} />
                    <Route path='/model/:id' element={<ModelsPage />} />
                  </Routes>
                </div>
              </div>
            )
            :
            (
              <Routes>
                <Route path='/signup' element={<SignupForm setUser={setUser} />} />
                <Route path='/' element={<LoginForm setUser={setUser} />} />
              </Routes>
            )
          }
        </div>
      </ModelsProvider>
    </LocationsProvider>
    // </MediaContextProvider>
  );
}

export default App;
