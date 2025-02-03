import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './signup/login';
import CountUp from './components/countUp';
import Signup from './signup/signup';
import MonthData from './components/monthData';
import CountDown from './components/countDown';

function App() {

    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/countup" element={<CountDown />} />
        </Routes>
      </Router>
    );
  }
  

export default App;
