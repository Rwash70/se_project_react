import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister, // Added prop for switching to Register
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To track error messages
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  // Reset form when modal closes
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(''); // Reset error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors before trying login

    try {
      // Call the parent function to handle login
      await onLogin({ email, password });
      resetForm(); // Reset form after successful login
    } catch (err) {
      setError('Login failed, please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  // Check if both inputs are filled
  const isFormFilled = email && password;

  return (
    <ModalWithForm
      title='Log In'
      name='login'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      hideSubmitButton={true}
    >
      <label className='modal__label'>
        Email*
        <input
          type='email'
          className='modal__input'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className='modal__label'>
        Password*
        <input
          type='password'
          className='modal__input'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className='modal__error'>{error}</p>} {/* Display error */}
      <div className='modal__switch-line'>
        <button
          type='submit'
          className='modal__submit-button'
          disabled={isLoading || !isFormFilled} // Disable if loading or form not filled
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        <span className='modal__or-text'> or </span>

        <button
          type='button'
          className='modal__switch-button'
          onClick={onSwitchToRegister} // Updated to call onSwitchToRegister to toggle to Register modal
        >
          Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
