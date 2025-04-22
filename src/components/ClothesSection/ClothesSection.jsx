import React, { useContext } from 'react';
import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import SideBar from '../SideBar/SideBar';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; // Import context

function ClothesSection({
  clothingItems,
  weatherData,
  handleCardClick,
  handleAddClick,
  handleDeleteClick,
}) {
  const { currentUser } = useContext(CurrentUserContext); // Access the currentUser context

  // Filter clothing items based on the current user
  const filteredItems = clothingItems.filter(
    (item) => item.owner === currentUser?.id
  );

  return (
    <div className='clothes-section'>
      <div>
        <p className='clothes-section__label'>Your Items</p>
        <button className='clothes-section__btn' onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className='clothes-section__items'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDeleteItem={() => handleDeleteClick(item._id)}
              handleCardClick={handleCardClick}
            />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
