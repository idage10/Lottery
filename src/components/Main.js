import { Routes, Route, Navigate } from 'react-router-dom';
import { Lottery } from './Lottery';
import { Seven } from './Seven';
import { Navbar } from './Navbar';

// A functional component to display the Main Page
export const Main = () => {
    return (
      <div className='mainDiv'>
        <Navbar />
        <Routes>
          <Route path="*" element={<Navigate to="/lotto" replace />} />
          <Route path="/lotto" element={<Lottery />} />
          <Route path="/777" element={<Seven />} />
        </Routes>
      </div>
    );
  };