import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './components/Context/ThemeContext/ThemeContext';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';

import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import './App.css';
import UserPage from './pages/UserPage/UserPage';
import FAQ from './pages/FAQ/FAQ';
import Error from './components/Shared/Error/Error';
import UserContext from './components/Context/UserContext/UserContext';

function App() {

  const { user } = useContext(UserContext);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="App">
      <Header />
      <div className={`page-content-container ${theme}`}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/*" element={<Error error={'404'} />} />
          <Route path='/FAQ' element={<FAQ />} />
          {user?.userType ?
            <Route path="/profile/*" element={<UserPage />} />
            :
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          }
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
