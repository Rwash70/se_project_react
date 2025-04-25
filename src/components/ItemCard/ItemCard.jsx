import React, { useState, useEffect, useContext } from 'react';
import './ItemCard.css';
import { deleteItems, addCardLike, removeCardLike } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemCard({ item, onDelete, handleCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser?.currentUser.id;

  // Ensure item is properly passed and has likes property
  if (!item || !Array.isArray(item.likes)) {
    console.error('Item or likes array is missing');
    return null; // Or return a loading/error UI component
  }

  // Local state for likes
  const [likes, setLikes] = useState(item.likes);

  const handleLikeClick = async (itemId) => {
    const hasLiked = likes.includes(currentUserId);

    try {
      if (hasLiked) {
        await removeCardLike(itemId);
        setLikes((prevLikes) => prevLikes.filter((id) => id !== currentUserId));
      } else {
        await addCardLike(itemId);
        setLikes((prevLikes) => [...prevLikes, currentUserId]);
      }
    } catch (error) {
      console.error('Error liking the item:', error);
    }
  };

  // Handle delete action (API call)
  const handleDeleteItem = async (itemId) => {
    try {
      const authToken = localStorage.getItem('jwt');
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      await deleteItems(itemId);
      onDelete(itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <li key={item._id} className='card'>
      <div className='card__name-container'>
        <h2 className='card__name'>{item.name}</h2>
        <button
          className={`card__like-button ${
            likes.includes(currentUserId) ? 'liked' : ''
          }`}
          onClick={() => handleLikeClick(item._id)}
        ></button>
      </div>
      <img
        onClick={() => handleCardClick(item)}
        className='card__image'
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
