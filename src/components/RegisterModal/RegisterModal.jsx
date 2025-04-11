import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useCallback, useState } from 'react';

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const isFormFilled = email && password && name && avatar;
  console.log({
    isFormFilled,
    email,
    password,
    name,
    avatar,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled) {
      onRegister({ name, avatar, email, password });
      resetForm();
    }
  };

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setName('');
    setAvatar('');
  }, []);

  return (
    <ModalWithForm
      title='Sign Up'
      name='register'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      hideSubmitButton={true}
      resetForm={resetForm}
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

      <label className='modal__label'>
        Name*
        <input
          type='text'
          className='modal__input'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className='modal__label'>
        Avatar URL*
        <input
          type='url'
          className='modal__input'
          placeholder='Avatar URL'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>

      <div className='modal__switch-line'>
        {/* Updated Sign Up button with dynamic background */}
        <button
          type='submit'
          className='modal__submit-button'
          style={{
            backgroundColor: isFormFilled ? 'black' : 'gray', // Change background color based on form completion
            cursor: isFormFilled ? 'pointer' : 'not-allowed', // Change cursor if button is disabled
          }}
          disabled={!isFormFilled} // Disable the button if the form is incomplete
        >
          Sign Up
        </button>

        {/* Show the Log In button only if the form is filled */}
        <button
          type='button'
          className={`modal__switch-button`}
          onClick={onSwitchToLogin}
          disabled={!isFormFilled}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
