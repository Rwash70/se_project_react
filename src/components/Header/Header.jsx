import { Link } from 'react-router-dom';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; // Import the context

function Header({
  handleAddClick,
  weatherData,
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  // Access the currentUser from context
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='website header logo' />
        </Link>

        <p className='header__date-and-location'>
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className='header__controls'>
        <ToggleSwitch />
        {currentUser ? (
          <>
            <button
              onClick={handleAddClick}
              type='button'
              className='header__add-clothes-btn'
            >
              + Add clothes
            </button>
            <Link to='/profile' className='header__link'>
              <div className='header__user-container'>
                <p className='header__username'>{currentUser.name}</p>
                <img
                  src={avatar}
                  alt={currentUser.name}
                  className='header__avatar'
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsRegisterModalOpen(true)} // Open Register Modal
              className='header__register-button'
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)} // Open Login Modal
              className='header__login-button'
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
