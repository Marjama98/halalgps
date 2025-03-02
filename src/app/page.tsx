"use client";

import { useState } from "react";
import RestaurantSearch from "@/components/RestaurantSearch";
import RestaurantList from "@/components/RestaurantList";
import { restaurants as allRestaurants } from "@/data/restaurants"; // Import your local restaurants data
import { Restaurant } from "@/types/types"; // Import the Restaurant type
import Chatbot from "@/components/Chatbot";  // Adjust the import path


export default function Home() {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(allRestaurants); // Store filtered restaurants



  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-center text-emerald-600 mb-6">
        HalalGPS
      </h1>
      
     
      {/* Restaurant Search Component */}
      <div className="w-full max-w-3xl mb-8">
        <RestaurantSearch setFilteredRestaurants={setFilteredRestaurants} allRestaurants={allRestaurants} />
      </div>

      {/* Restaurant List Component */}
      <div className="w-full max-w-4xl mb-8">
        <RestaurantList restaurants={filteredRestaurants} setFilteredRestaurants={setFilteredRestaurants} />
      </div>

     
      {/* Chatbot Component */}
      <div className="w-full max-w-4xl mb-8">
        <Chatbot />
      </div>
    </main>
  );
}