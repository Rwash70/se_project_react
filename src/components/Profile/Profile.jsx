import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  weatherData,
  handleCardClick,
  handleAddClick,
  handleDeleteClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-item">
        <ClothesSection
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          handleDeleteClick={handleDeleteClick}
        />
      </section>
    </div>
  );
}

export default Profile;
