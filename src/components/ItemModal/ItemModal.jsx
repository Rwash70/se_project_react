import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  // Confirm before deleting
  const handleDeleteConfirm = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
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
            <p className="modal__weather">Weather:{card.weather}</p>
          </div>
          <button
            onClick={() => handleDeleteConfirm(card._id)}
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
