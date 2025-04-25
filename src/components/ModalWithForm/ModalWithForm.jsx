import React, { useEffect } from 'react';
import './ModalWithForm.css';

const ModalWithForm = ({
  children,
  name,
  title,
  isOpen,
  activeModal,
  onClose,
  onSubmit,
  resetForm, // Optional reset logic
  hideSubmitButton,
  isLoading = false,
  error = null,
  buttonText = name, // Default to `name` if buttonText not passed
}) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__content'>
        <h2 className='modal__title'>{title}</h2>
        <button
          onClick={onClose}
          type='button'
          className='modal__close'
        ></button>
        <form onSubmit={onSubmit} className='modal__form' name={name}>
          {children}
          {error && <p className='modal__error'>{error}</p>}
          {!hideSubmitButton && (
            <button
              type='submit'
              className='modal__submit'
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
