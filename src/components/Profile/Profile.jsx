import React, { useState, useContext } from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUserInfo } from '../../utils/api';

function Profile({
  clothingItems,
  weatherData,
  handleCardClick,
  handleAddClick,
  handleDeleteClick,
  handleLogOut,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = useState(false); // Modal open/close state

  // Handles user info update from modal
  const handleUpdateUser = async (userData) => {
    // Only include fields that are actually provided
    const validData = {};
    if (userData.name?.trim()) validData.name = userData.name.trim();
    if (userData.avatar?.trim()) validData.avatar = userData.avatar.trim();

    // Prevent update if no valid fields
    if (!validData.name && !validData.avatar) {
      console.error('No valid user data provided for update.');
      return;
    }

    try {
      const updatedUser = await updateUserInfo(validData);
      setCurrentUser(updatedUser);
      setIsEditOpen(false); // Close modal after update
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear user context
    setCurrentUser(null);

    // Redirect to the login page or homepage (depending on your app's structure)
    navigate('/login'); // Adjust route as needed
  };

  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
        <button
          className='profile__edit-btn'
          onClick={() => setIsEditOpen(true)}
        >
          Change profile data
        </button>

        {/* Logout button */}
        <button className='profile__logout-btn' onClick={handleLogOut}>
          Log out
        </button>
      </section>

      <section className='profile__clothes-item'>
        <ClothesSection
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          handleDeleteClick={handleDeleteClick}
        />
      </section>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default Profile;
