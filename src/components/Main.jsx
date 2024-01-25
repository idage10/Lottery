import { Routes, Route, Navigate } from 'react-router-dom';
import { LotteryLotto } from './LotteryLotto';
import { Lottery777 } from './Lottery777';
import { Navbar } from './Navbar';

// A functional component to display the Main Page
export const Main = () => {
    return (
      <div className='mainDiv'>
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/lotto" replace />} />
          <Route path="/lotto" element={<LotteryLotto />} />
          <Route path="/777" element={<Lottery777 />} />
        </Routes>
      </div>
    );
  };