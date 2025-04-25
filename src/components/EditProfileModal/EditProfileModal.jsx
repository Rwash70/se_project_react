import React, { useContext, useState, useEffect } from 'react';
import './EditProfileModal.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

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

    const updateData = {};
    if (name.trim()) updateData.name = name.trim();
    if (avatar.trim()) updateData.avatar = avatar.trim();

    if (!updateData.name && !updateData.avatar) {
      setError(
        'You must provide at least one field (name or avatar) to update'
      );
      setIsLoading(false);
      return;
    }

    try {
      await onUpdateUser(updateData);
      onClose();
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      name='edit-profile'
      title='Edit Profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      buttonText='Save changes'
    >
      <label className='edit-profile-modal__label'>
        Name:
        <input
          className='edit-profile-modal__input'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
        />
      </label>
      <label className='edit-profile-modal__label'>
        Avatar URL:
        <input
          className='edit-profile-modal__input'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder='Enter avatar URL'
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
