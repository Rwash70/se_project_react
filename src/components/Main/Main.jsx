import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Footer from "../footer/footer";
import { deleteItems } from "../../utils/api";

// The Main component includes WeatherCard and ItemCard components.
const Main = ({
  weatherData,
  handleCardClick,
  handleDeleteItems,
  clothingItems,
}) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onDeleteItem={handleDeleteItems}
                />
              );
            })}
        </ul>
      </section>
      <Footer />
    </main>
  );
};

export default Main;
