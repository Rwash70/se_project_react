import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Importing constants
import { coordinates, APIkey } from '../../utils/constants';

// Importing components
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import Profile from '../Profile/Profile';
import Footer from '../footer/footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
// Importing weather functions and API handlers
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { getItems, addItems, deleteItems } from '../../utils/api';

// Importing context
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext'; // Import CurrentUserProvider

// Importing default data
import { defaultClothingItems } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Import ProtectedRoute

function App() {
  // State to hold weather data
  const [weatherData, setWeatherData] = useState({
    type: '',
    city: '',
    temp: {
      F: 999,
      C: 999,
    },
    condition: '',
    isDay: true,
  });

  // Clothing items state
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  // Modal control state
  const [activeModal, setActiveModal] = useState('');

  // Stores the card clicked for preview
  const [selectedCard, setSelectedCard] = useState({});

  // Temperature unit toggle (F or C)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  // Login and Register modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // User login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggles the current temperature unit between F and C
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === 'F' ? 'C' : 'F'));
  };

  // Opens preview modal when a card is clicked
  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  // Opens add-garment modal when the add button is clicked
  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  // Opens the Login Modal
  const handleLoginClick = () => {
    setActiveModal('login');
  };

  // Opens the Register Modal
  const handleRegisterClick = () => {
    setActiveModal('register');
  };

  // Closes any active modal
  const closeActiveModal = () => {
    setActiveModal('');
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Handles the submission of a new clothing item
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return addItems({ name, imageUrl, weather }).then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    });
  };

  // Handles deleting a clothing item by ID
  const handleDeleteItems = async (id) => {
    try {
      await deleteItems(id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal();
    } catch (error) {
      console.error('Failed to delete items:', error);
    }
  };

  // Fetch weather data when the app loads
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Fetch clothing items from API on initial load
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Handle Card Like functionality
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((prevItems) =>
              prevItems.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((prevItems) =>
              prevItems.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // Handle Sign Out functionality
  const handleSignOut = () => {
    localStorage.removeItem('jwt'); // Remove token from localStorage
    setIsLoggedIn(false); // Update isLoggedIn state
  };

  return (
    <CurrentUserProvider>
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
                  <Profile
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    handleAddClick={handleAddClick}
                    handleSignOut={handleSignOut} // Pass handleSignOut to Profile
                  />
                }
              />
            </Routes>
            <Footer />
          </div>

          {/* Modals */}
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

          {/* Login Modal */}
          <LoginModal
            isOpen={activeModal === 'login'}
            onClose={closeActiveModal}
            onLogin={(userData) => {
              console.log('Login data: ', userData);
              setIsLoggedIn(true);
              closeActiveModal();
            }}
          />

          {/* Register Modal */}
          <RegisterModal
            isOpen={activeModal == 'register'}
            onClose={closeActiveModal}
            onRegister={(userData) => {
              console.log('Register data: ', userData);
              setIsLoggedIn(true);
              closeActiveModal();
            }}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserProvider>
  );
}

export default App;
