import { useState } from "react";
import "./ItemModal.css";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  // Confirm before deleting
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(card);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
          <button
            onClick={onClose}
            type="button"
            className="modal__close modal__close_color_white"
          ></button>
          <img
            src={card.imageUrl}
            alt={`image of ${card.name}`}
            className="modal__image"
          />
          <div className="modal__footer">
            <div>
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              onClick={handleDeleteClick}
              className="modal__delete-button"
            >
              Delete item
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default ItemModal;
