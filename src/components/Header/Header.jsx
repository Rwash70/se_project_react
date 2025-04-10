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
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const { currentUser } = useContext(CurrentUserContext); // Access the currentUser

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
            <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
            <button onClick={() => setIsRegisterModalOpen(true)}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
