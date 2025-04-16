import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import components and API methods
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import Profile from '../Profile/Profile';
import Footer from '../footer/footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from '../../utils/api';
import { authorize, getUserInfo, register } from '../../utils/auth';

import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    city: '',
    temp: { F: 999, C: 999 },
    condition: '',
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(''); // New state for managing active modals

  // Handle switching between modals
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setActiveModal('login'); // Set active modal to 'login'
  };
  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    setActiveModal('register'); // Set active modal to 'register'
  };

  const closeActiveModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setActiveModal(''); // Reset active modal when closing
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          return getItems(token);
        })
        .then((items) => setClothingItems(items))
        .catch((err) => {
          console.error('Token validation or item fetch failed:', err);
          handleSignOut();
        });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const data = await authorize({ email, password });
      if (!data?.token) {
        throw new Error('Token not received from server');
      }

      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);

      const user = await getUserInfo(data.token);
      setCurrentUser(user);

      const items = await getItems(data.token);
      setClothingItems(items);

      closeActiveModal();
    } catch (err) {
      console.error('Login error:', err.message || err);
      throw err;
    }
  };

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.error('Registration error:', err));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
      >
        <div className='page'>
          <div className='page__wrapper'>
            <Header
              weatherData={weatherData}
              setIsLoginModalOpen={handleLoginClick}
              setIsRegisterModalOpen={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          {/* Modal Components */}
          {activeModal && (
            <>
              <AddItemModal onClose={closeActiveModal} />
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
              />
            </>
          )}

          {/* Login Modal */}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeActiveModal}
            onLogin={handleLoginSubmit}
            onSwitchToRegister={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
              setActiveModal('register'); // Switch active modal to register
            }}
          />

          {/* Register Modal */}
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeActiveModal}
            onRegister={handleRegisterSubmit}
            onSwitchToLogin={() => {
              console.log('Switching from Register to Login');
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
              setActiveModal('login'); // Switch active modal to login
            }}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
