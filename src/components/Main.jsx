import { Routes, Route, Navigate } from 'react-router-dom';
import { LotteryLotto } from './LotteryLotto';
import { Lottery777 } from './Lottery777';
import { Navbar } from './Navbar';
import React, { useState } from 'react';

// A functional component to display the Main Page
export const Main = () => {
  // close menu after clicking the main body page in mobile resolution
  const [isClickOnMobileMainPage, setClickOnMobileMainPage] = useState(false);
  // use to define if running after page refresh or new app is running
  const [isFirstPageRefreshLotto, setFirstPageRefreshLotto] = useState(true);
  const [isFirstPageRefresh777, setFirstPageRefresh777] = useState(true);
  
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
              isFirstPageRefreshLotto={isFirstPageRefreshLotto}
              setFirstPageRefreshLotto={setFirstPageRefreshLotto}
            />
          } 
        />
        <Route 
          path="/777" 
          element={
            <Lottery777 
              setClickOnMobileMainPage={setClickOnMobileMainPage}
              isFirstPageRefresh777={isFirstPageRefresh777}
              setFirstPageRefresh777={setFirstPageRefresh777}
            />
          } 
        />
      </Routes>
    </div>
  );
};