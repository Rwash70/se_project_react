import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  name,
  title,
  isOpen,
  activeModal,
  onClose,
  onSubmit,
}) => {
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
