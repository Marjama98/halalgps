import React, { useState } from "react";
import { Restaurant } from "@/types/types";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Handle clicking on a restaurant to open the popup
  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Close the popup
  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{restaurant.name}</h3>
          <p className="text-sm text-gray-600">{restaurant.type}</p>
          <p className="text-sm text-gray-500">{restaurant.address}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">{`${restaurant.rating} ⭐`}</span>
          </div>
        </div>
      ))}

      {/* Popup */}
      {selectedRestaurant && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the popup
          >
            <h2 className="text-2xl font-semibold">{selectedRestaurant.name}</h2>
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-full h-64 object-cover rounded-lg my-4"
            />
            <p className="text-lg">{selectedRestaurant.type}</p>
            <p className="text-sm text-gray-600">{selectedRestaurant.address}</p>
            <p className="text-sm text-yellow-500">{`${selectedRestaurant.rating} ⭐`}</p>
            <button
              onClick={closePopup}
              className="mt-4 p-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
