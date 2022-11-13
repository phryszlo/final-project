import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import { createMedia } from "@artsy/fresnel";

import AuthForm from './components/AuthForm';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Success from './components/Success';
import Main from './components/Main';
import NavBar from './components/NavBar';
import NASA from './components/NASA';
import { getUser } from './utilities/users-service'




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
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
  ];

  useEffect(() => {
    console.log(`user on useEff[user] ${JSON.stringify(user)}`)
  }, [user])

  return (
    <MediaContextProvider>
      <div className="App">
        {user
          ?
          (
            <div>
              <NavBar leftItems={leftItems} rightItems={rightItems} Media={Media} />
              <Routes>
                <Route path='/' element={<Success />} />
                <Route path='/success' element={<Success />} />
                <Route path='/main' element={<Main />} />
                <Route path='/nasa' element={<NASA />} />
              </Routes>
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
    </MediaContextProvider>
  );
}

export default App;
