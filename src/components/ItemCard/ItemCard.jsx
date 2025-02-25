import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteItem }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {/* <button className="delete_button" onClick={() => onDeleteItem(item._id)}>
        Delete
      </button> */}
    </li>
  );
}
export default ItemCard;
