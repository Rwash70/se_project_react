import React, { useState, useContext } from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import EditProfileModal from '../EditProfileModal/EditProfileModal'; // Importing the modal
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
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Function to handle updating user data
  const handleUpdateUser = async (userData) => {
    try {
      // Update the user info through the API
      const updatedUser = await updateUserInfo(userData);
      // Set the updated user info into context
      setCurrentUser(updatedUser);
      // Close the edit profile modal
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
        {/* Button to open the EditProfileModal */}
        <button
          className='profile__edit-btn'
          onClick={() => setIsEditOpen(true)} // Open the modal to edit profile
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

      {/* EditProfileModal component - controls opening and passing the update function */}
      <EditProfileModal
        isOpen={isEditOpen} // Controls modal visibility
        onClose={() => setIsEditOpen(false)} // Close modal handler
        onUpdateUser={handleUpdateUser} // Pass the update handler to modal
      />
    </div>
  );
}

export default Profile;
