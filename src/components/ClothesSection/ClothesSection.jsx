import React from "react";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";

function ClothesSection({
  clothingItems,
  weatherData,
  handleCardClick,
  handleAddClick,
  handleDeleteClick,
}) {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__label">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onDeleteItem={() => handleDeleteClick(item._id)}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
