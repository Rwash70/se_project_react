import { useState, useEffect } from 'react';
import './ItemCard.css';

function ItemCard({ item, onCardClick, onDeleteItem, handleCardLike }) {
  console.log('Rendering ItemCard:', item);

  // State to track if the item is liked by the user
  const [isLiked, setIsLiked] = useState(false);

  // Check if the item is liked by the user (assuming currentUserId is passed as a prop or available in context)
  useEffect(() => {
    // Check if current user has liked the item (you can pass currentUserId as a prop or from context)
    const currentUserId = 'currentUserId'; // Replace with actual user ID logic
    if (item.likes && item.likes.includes(currentUserId)) {
      setIsLiked(true); // Set true if current user has liked this item
    } else {
      setIsLiked(false); // Set false if the current user has not liked this item
    }
  }, [item.likes]);

  // Handle the click of the like button
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Toggle like state
    handleCardLike(item._id, !isLiked); // Pass card ID and new like state to parent handler
  };

  const handleCardClick = () => {
    onCardClick(item); // Call parent handler for card click
  };

  return (
    <li className='card'>
      <h2 className='card__name'>{item.name}</h2>
      <img
        onClick={handleCardClick}
        className='card__image'
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        className={`card__like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleLikeClick}
      >
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <button
        className='card__delete-button'
        onClick={() => onDeleteItem(item._id)}
      >
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
