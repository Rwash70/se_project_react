import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

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
// import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    city: '',
    temp: { F: 999, C: 999 },
    condition: '',
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === 'F' ? 'C' : 'F'));
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleLoginClick = () => {
    setActiveModal('login');
  };

  const handleRegisterClick = () => {
    setActiveModal('register');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem('jwt');
    return addItems({ name, imageUrl, weather }, token).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    });
  };

  const handleDeleteItems = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await deleteItems(id, token);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal();
    } catch (error) {
      console.error('Failed to delete items:', error);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (isLiked) {
      removeCardLike(id, token).then(() => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, isLiked: false } : item
          )
        );
      });
    } else {
      addCardLike(id, token).then(() => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, isLiked: true } : item
          )
        );
      });
    }
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
          return getItems(token); // Fetch items using JWT
        })
        .then((items) => {
          setClothingItems(items);
        })
        .catch((err) => {
          console.error('Token validation or item fetch failed:', err);
          handleSignOut(); // Handle sign-out in case of error
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
      debugger;
      setCurrentUser(user);

      const items = await getItems(data.token);
      setClothingItems(items);

      closeActiveModal();
    } catch (err) {
      console.error('Login error:', err.message || err);
      throw err; // still re-throw so LoginModal can catch/display
    }
  };

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
        setActiveModal('');
      })
      .catch((err) => console.error('Registration error:', err));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className='page'>
          <div className='page__wrapper'>
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    handleAddClick={handleAddClick}
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
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === 'add-garment'}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItems}
          />

          <LoginModal
            isOpen={activeModal === 'login'}
            onClose={closeActiveModal}
            onLogin={handleLoginSubmit}
          />

          <RegisterModal
            isOpen={activeModal === 'register'}
            onClose={closeActiveModal}
            onRegister={handleRegisterSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
