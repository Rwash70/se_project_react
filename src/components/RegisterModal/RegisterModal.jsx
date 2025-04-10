import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  // State hooks for each input field
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
    // Clear inputs after submit (optional)
    setName('');
    setAvatar('');
    setEmail('');
    setPassword('');
  };

  return (
    <ModalWithForm
      title='Sign up'
      name='register'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className='modal__label'>
        Name
        <input
          type='text'
          className='modal__input'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className='modal__label'>
        Avatar URL
        <input
          type='url'
          className='modal__input'
          placeholder='Link to your avatar'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>

      <label className='modal__label'>
        Email
        <input
          type='email'
          className='modal__input'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className='modal__label'>
        Password
        <input
          type='password'
          className='modal__input'
          placeholder='Create a password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
