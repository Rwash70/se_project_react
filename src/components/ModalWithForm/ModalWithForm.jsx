import React, { useEffect } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  name,
  title,
  isOpen,
  activeModal,
  onClose,
  onSubmit,
  resetForm, // Pass resetForm as a prop to reset form on modal open
}) => {
  // Reset the form when modal is opened
  useEffect(() => {
    if (isOpen && resetForm) {
      resetForm(); // Call reset function passed as prop
    }
  }, [isOpen, resetForm]);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {name}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
