// src/components/LoginModal/LoginModal.jsx
import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the login function passed as a prop
    onLogin({ email, password });
    // Clear inputs after submit (optional)
    setEmail('');
    setPassword('');
  };

  return (
    <ModalWithForm
      title='Sign in'
      name='login'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
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
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
