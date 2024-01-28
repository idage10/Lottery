import { Routes, Route, Navigate } from 'react-router-dom';
import { LotteryLotto } from './LotteryLotto';
import { Lottery777 } from './Lottery777';
import { Navbar } from './Navbar';
import { useState } from 'react';

// A functional component to display the Main Page
export const Main = () => {
    const [isClickOnMobileMainPage, setClickOnMobileMainPage] = useState(false);

    return (
      <div className='mainDiv'>
        <Navbar isClickOnMobileMainPage={isClickOnMobileMainPage} setClickOnMobileMainPage={setClickOnMobileMainPage} />
        <Routes>
          <Route path="*" element={<Navigate to="/lotto" replace />} />
          <Route path="/lotto" element={<LotteryLotto setClickOnMobileMainPage={setClickOnMobileMainPage} />} />
          <Route path="/777" element={<Lottery777 setClickOnMobileMainPage={setClickOnMobileMainPage} />} />
        </Routes>
      </div>
    );
  };