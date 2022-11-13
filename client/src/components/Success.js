import React from 'react'
import { motion as m } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 4 }} className="success">
      <div className="success">
        {state ? (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <h1 className="text-3xl pb-4 font-latoBold">Thanks for the email {state.name} 🤺</h1>
            <p className="text-lg text-gray-700 pb-4">An email has been sent to {state.email} with further instructions.</p>
          </m.div>)
          :
          (<div className="success">Welcome to my thing. </div>)
        }
        <Button className="continue-btn" onClick={() => navigate('/main')}>continue</Button>
      </div> 
    </m.main>
  )
}
