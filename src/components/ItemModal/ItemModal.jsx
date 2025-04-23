import { useContext, useState } from 'react';
import './ItemModal.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; // Import context
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

function ItemModal({ activeModal, onClose, card, onDelete, onToggleModal }) {
  const { currentUser } = useContext(CurrentUserContext); // Access the currentUser context
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Step 3: Show delete confirmation modal
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Step 4: Confirm deletion and trigger the delete logic
  const handleConfirmDelete = () => {
    if (typeof onDelete === 'function') {
      if (card && card._id !== undefined && card._id !== null) {
        onDelete(card._id); // Call the onDelete function passed down as a prop
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
        onClose(); // Optionally close the ItemModal after deleting
      } else {
        console.error('Error: Card ID is missing or invalid', card);
      }
    } else {
      console.error('Error: onDelete prop is not a function');
    }
  };

  return (
    <>
      <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
        <div className='modal__content modal__content_type_image'>
          <button
            onClick={onClose}
            type='button'
            className='modal__close modal__close_color_white'
          ></button>

          {card && (
            <>
              <img
                src={card.imageUrl}
                alt={`image of ${card.name}`}
                className='modal__image'
              />
              <div className='modal__footer'>
                <div>
                  <h2 className='modal__caption'>{card.name}</h2>
                  <p className='modal__weather'>Weather: {card.weather}</p>
                </div>
                {currentUser && card.owner === currentUser.id && (
                  // Add the delete button only if the card is owned by the current user
                  <button
                    onClick={handleDeleteClick}
                    className='modal__delete-button'
                  >
                    Delete item
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Modal for Login and Sign Up */}
      <div
        className={`modal ${
          activeModal === 'signup' || activeModal === 'login'
            ? 'modal_opened'
            : ''
        }`}
      >
        <div className='modal__content'>
          {/* Both Login and Sign Up Forms are displayed at the same time */}
          <div className='auth-forms'>
            {/* Login Form */}
            {activeModal === 'login' && (
              <div className='login-form'>
                <h2>Login</h2>
                <button onClick={() => onToggleModal('signup')}>
                  Go to Sign Up
                </button>
              </div>
            )}

            {/* Sign Up Form */}
            {activeModal === 'signup' && (
              <div className='signup-form'>
                <h2>Sign Up</h2>
                <button onClick={() => onToggleModal('login')}>
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
