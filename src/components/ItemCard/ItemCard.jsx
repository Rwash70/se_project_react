import React, { useState, useEffect } from 'react';
import './ItemCard.css';

function ItemCard({ item, onDelete }) {
  const currentUserId = 'currentUserId'; // Replace this with actual logic to get the user ID, e.g., from context

  // Ensure item is properly passed and has likes property
  if (!item || !Array.isArray(item.likes)) {
    console.error('Item or likes array is missing');
    return null; // Or return a loading/error UI component
  }

  // Handle like toggle action
  const handleLikeClick = async (itemId) => {
    if (!item || !item.likes) {
      console.error('Item or likes property is undefined');
      return;
    }

    const updatedLikesState = !item.likes.includes(currentUserId)
      ? [...item.likes, currentUserId]
      : item.likes.filter((id) => id !== currentUserId);

    try {
      const response = await fetch(`/api/items/${itemId}/like`, {
        method: 'PATCH',
        body: JSON.stringify({ likes: updatedLikesState }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include JWT token for authentication
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error liking the item:', error);
    }
  };

  // Handle delete action (API call)
  const handleDeleteItem = async (itemId) => {
    try {
      const authToken = localStorage.getItem('jwt'); // Replace with your preferred storage mechanism

      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the JWT token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to delete item: ${errorData.message || 'Unknown error'}`
        );
      }

      // Call onDelete to remove the item from the list in the parent component
      onDelete(itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <li key={item._id} className='card'>
      <h2 className='card__name'>{item.name}</h2>
      <img className='card__image' src={item.imageUrl} alt={item.name} />
      <button
        className={`card__like-button ${
          item.likes.includes(currentUserId) ? 'liked' : ''
        }`}
        onClick={() => handleLikeClick(item._id)}
      >
        {item.likes.includes(currentUserId) ? 'Unlike' : 'Like'}
      </button>
      <button
        className='card__delete-button'
        onClick={() => handleDeleteItem(item._id)}
      >
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
