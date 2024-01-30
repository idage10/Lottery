import { Routes, Route, Navigate } from 'react-router-dom';
import { LotteryLotto } from './LotteryLotto';
import { Lottery777 } from './Lottery777';
import { Navbar } from './Navbar';
import React, { useState } from 'react';

// A functional component to display the Main Page
export const Main = () => {
  // close menu after clicking the main body page in mobile resolution
  const [isClickOnMobileMainPage, setClickOnMobileMainPage] = useState(false);
  // use to clear the session storage data for each component after new app session or refresh only once
  const [isClearSessionStorageLotto, setClearSessionStorageLotto] = useState(true);
  const [isClearSessionStorage777, setClearSessionStorage777] = useState(true);
  
  const navBarTitleData = {
    titleName: "מפעל הפיס", alt: "לוגו מפעל הפיס", className: "paisLogo",
    src: `${process.env.PUBLIC_URL}/images/pais-logo.png`
  };
  
  const navBarMenuButtonsData = [{
    navLinkTo: "/lotto", navLinkClassName: "lottoNav", imgClassName: "navLoggoLotto",
    imgSrc: `${process.env.PUBLIC_URL}/images/lotto-logo.png`, imgAlt: "לוגו לוטו"
  },
  {
    navLinkTo: "/777", navLinkClassName: "sevenNav", imgClassName: "navLoggo777",
    imgSrc: `${process.env.PUBLIC_URL}/images/777-logo.png`, imgAlt: "לוגו 777"
  }];

  return (
    <div className='mainDiv'>
      <Navbar isClickOnMobileMainPage={isClickOnMobileMainPage} setClickOnMobileMainPage={setClickOnMobileMainPage} 
        navBarTitleData={navBarTitleData} navBarMenuButtonsData={navBarMenuButtonsData}
      >
      </Navbar>
      <Routes>
        <Route path="*" element={<Navigate to="/lotto" replace />} />
        <Route 
          path="/lotto" 
          element={
            <LotteryLotto 
              setClickOnMobileMainPage={setClickOnMobileMainPage}
              isClearSessionStorageLotto={isClearSessionStorageLotto}
              setClearSessionStorageLotto={setClearSessionStorageLotto}
            />
          } 
        />
        <Route 
          path="/777" 
          element={
            <Lottery777 
              setClickOnMobileMainPage={setClickOnMobileMainPage}
              isClearSessionStorage777={isClearSessionStorage777}
              setClearSessionStorage777={setClearSessionStorage777}
            />
          } 
        />
      </Routes>
    </div>
  );
};