import React, { useState, useEffect } from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
  // Sample state to hold items (replace with actual data from your API)
  // const [items, setItems] = useState([]);

  // Fetch items from the database on component mount
  // useEffect(() => {
  //   // Replace with your API call to get the items from the database
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch('/api/items'); // Replace with your endpoint
  //       const data = await response.json();
  //       setItems(data); // Set the fetched items in state
  //     } catch (error) {
  //       console.error('Error fetching items:', error);
  //     }
  //   };

  //   fetchItems();
  // }, []);

  // Simulate currentUserId (replace this with actual logic for user ID)
  const currentUserId = 'currentUserId'; // Replace with actual user ID logic

  // Handle like toggle action
  const handleLikeClick = async (itemId) => {
    const updatedItems = items.map((item) => {
      if (item._id === itemId) {
        const newLikesState = !item.likes.includes(currentUserId)
          ? [...item.likes, currentUserId]
          : item.likes.filter((id) => id !== currentUserId);
        return { ...item, likes: newLikesState };
      }
      return item;
    });

    setItems(updatedItems); // Update the local state to reflect the like change

    try {
      // Make an API call to update likes in the database
      await fetch(`/api/items/${itemId}/like`, {
        method: 'PATCH',
        body: JSON.stringify({
          likes: updatedItems.find((item) => item._id === itemId).likes,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error liking the item:', error);
    }
  };

  // Handle delete action (API call + local state update)
  const handleDeleteItem = async (itemId) => {
    try {
      // Make an API call to delete the item from the database
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Update local state by removing the deleted item
      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems); // Re-render the component with the updated list of items
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
