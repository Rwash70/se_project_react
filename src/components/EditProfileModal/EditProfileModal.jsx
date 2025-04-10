import React, { useContext, useState, useEffect } from 'react';
import './EditProfileModal.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUserInfo } from '../../utils/api'; // Import the API function

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      // Call the updateUserInfo function
      const updatedUser = await updateUserInfo({ name, avatar });
      // If successful, call onUpdateUser to update the global state
      onUpdateUser(updatedUser);
      onClose(); // Close the modal after updating
    } catch (err) {
      setError('Failed to update profile'); // Set error message if the update fails
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal__content'>
        <button className='modal__close' onClick={onClose}>
          ×
        </button>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Avatar URL:
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          {error && <p className='error-message'>{error}</p>}
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
