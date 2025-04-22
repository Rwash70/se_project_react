import React, { useContext, useState, useEffect } from 'react';
import './EditProfileModal.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { updateUserInfo } from '../../utils/api';

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Ensure that either name or avatar is provided
    if (!name && !avatar) {
      setError(
        'You must provide at least one field (name or avatar) to update'
      );
      setIsLoading(false);
      return;
    }

    try {
      const updatedUser = await updateUserInfo({ name, avatar });
      onUpdateUser(updatedUser); // Update user context or parent state
      onClose(); // Close the modal after successful update
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='edit-profile-modal'>
      <div className='edit-profile-modal__content'>
        <button className='edit-profile-modal__close' onClick={onClose}>
          ×
        </button>
        <h2 className='edit-profile-modal__title'>Edit Profile</h2>
        <form className='edit-profile-modal__form' onSubmit={handleSubmit}>
          <label className='edit-profile-modal__label'>
            Name:
            <input
              className='edit-profile-modal__input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className='edit-profile-modal__label'>
            Avatar URL:
            <input
              className='edit-profile-modal__input'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          {error && <p className='edit-profile-modal__error'>{error}</p>}
          <button
            className='edit-profile-modal__submit'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
