import React, { useState, useEffect } from 'react';
import './ItemCard.css';
import { deleteItems, addCardLike, removeCardLike } from '../../utils/api';

function ItemCard({ item, onDelete, handleCardClick }) {
  const currentUserId = 'currentUserId'; // Replace this with actual logic to get the user ID, e.g., from context

  // Ensure item is properly passed and has likes property
  if (!item || !Array.isArray(item.likes)) {
    console.error('Item or likes array is missing');
    return null; // Or return a loading/error UI component
  }

  // Handle like toggle action using API helpers
  const handleLikeClick = async (itemId) => {
    if (!item || !item.likes) {
      console.error('Item or likes property is undefined');
      return;
    }

    const hasLiked = item.likes.includes(currentUserId);

    try {
      if (hasLiked) {
        // Call removeCardLike to unlike the item
        await removeCardLike(itemId);
        item.likes = item.likes.filter((id) => id !== currentUserId); // Update local UI state
      } else {
        // Call addCardLike to like the item
        await addCardLike(itemId);
        item.likes.push(currentUserId); // Update local UI state
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

      // Call the deleteItems function to delete the item
      await deleteItems(itemId); // No need to check response.ok, it's handled in api.js
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
            item.likes.includes(currentUserId) ? 'liked' : ''
          }`}
          onClick={() => handleLikeClick(item._id)} // On Like/Unlike button click
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
