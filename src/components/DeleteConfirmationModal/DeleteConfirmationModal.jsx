import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <h2 className="delete-modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="delete-modal__text">This action is irreversible.</p>
        <div className="delete-modal__buttons">
          <button onClick={onConfirm} className="delete-modal-delete__button">
            Yes, delete item
          </button>
          <button onClick={onClose} className="delete-modal-cancel__button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
