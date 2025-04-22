// Updates: Imports
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
  // Updates: State declarations
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

  // Updates: Modal state and activeModal handler
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('');

  // Updates: Modal switch handlers
  const handleAddClick = () => {
    setActiveModal('add-item');
  };

  //opens the itemModal with the card that was clicked
  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setActiveModal('login');
  };
  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    setActiveModal('register');
  };

  const closeActiveModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setActiveModal('');
  };

  // Updates: Weather fetch
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Updates: Auth and item fetch on mount
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

  // Updates: Login handler
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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // Call the API to add the new item

    return addItems({ name, imageUrl, weather }).then((newItem) => {
      // Updated the clothingItems array upon success
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      // close the modal after the successful API response
      closeActiveModal();
    });
  };

  // Updates: Register handler with auto-login
  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.error('Registration error:', err));
  };

  // Updates: Handle like toggle action and update state
  const handleLikeClick = async (itemId) => {
    try {
      const updatedLikesState = !item.likes.includes(currentUser._id)
        ? [...item.likes, currentUser._id]
        : item.likes.filter((id) => id !== currentUser._id);

      const response = await fetch(`/api/items/${itemId}/like`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: updatedLikesState }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
      // Update the state or re-fetch items after the like is toggled
      const updatedItems = await getItems(localStorage.getItem('jwt'));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error liking the item:', error);
    }
  };

  // Updates: Handle delete action
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to delete item: ${errorData.message || 'Unknown error'}`
        );
      }

      // Re-fetch items after deletion
      const updatedItems = await getItems(localStorage.getItem('jwt'));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
              handleAddClick={handleAddClick}
            />

            {/* Updates: Routes */}
            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onLikeClick={handleLikeClick} // Pass the like handler
                    onDeleteItem={handleDeleteItem} // Pass the delete handler
                    handleCardClick={handleCardClick}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* Updates: Modals */}
          {activeModal && (
            <>
              <AddItemModal
                onClose={closeActiveModal}
                isOpen={activeModal === 'add-item'}
                onAddItemModalSubmit={handleAddItemModalSubmit}
              />
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
              />
            </>
          )}

          {/* Updates: Login Modal */}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeActiveModal}
            onLogin={handleLoginSubmit}
            onSwitchToRegister={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
              setActiveModal('register');
            }}
          />

          {/* Updates: Register Modal */}
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeActiveModal}
            onRegister={handleRegisterSubmit}
            onSwitchToLogin={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
              setActiveModal('login');
            }}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
