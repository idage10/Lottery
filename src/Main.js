import { Route, Routes, Navigate } from 'react-router-dom';
import { Lottery } from './Lottery';
import { Seven } from './Seven';

// A functional component to display the Main Page
export const Main = () => {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/lotto" replace />} />
        <Route path="/lotto" element={<Lottery />} />
        <Route path="/777" element={<Seven />} />
      </Routes>
    );
  };