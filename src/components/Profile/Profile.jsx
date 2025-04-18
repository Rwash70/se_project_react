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
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = useState(false); // Modal open/close state

  // Handles user info update from modal
  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await updateUserInfo(userData);
      setCurrentUser(updatedUser);
      setIsEditOpen(false); // Close modal after update
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
        <button
          className='profile__edit-btn'
          onClick={() => setIsEditOpen(true)}
        >
          Edit Profile
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
