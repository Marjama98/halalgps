import { useState } from 'react';

// Mock fetchRecipes function
const fetchRecipes = (ingredients: string, diet: string, time: number) => {
  console.log(`Fetching recipes with ingredients: ${ingredients}, diet: ${diet}, time: ${time}`);
};

const FilterComponent = () => {
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedTime, setSelectedTime] = useState(30); // Default 30 mins

  return (
    <div>
      {/* Diet Filter */}
      <select value={selectedDiet} onChange={(e) => setSelectedDiet(e.target.value)}>
        <option value="">All Diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="keto">Keto</option>
        <option value="gluten free">Gluten-Free</option>
      </select>

      {/* Cooking Time Filter */}
      <select value={selectedTime} onChange={(e) => setSelectedTime(Number(e.target.value))}>
        <option value={15}>Under 15 mins</option>
        <option value={30}>Under 30 mins</option>
        <option value={60}>Under 1 hour</option>
        <option value={120}>Under 2 hours</option>
      </select>

      {/* Fetch Recipes Button */}
      <button onClick={() => fetchRecipes("chicken, rice", selectedDiet, selectedTime)}>
        Find Recipes
      </button>
    </div>
  );
};

export default FilterComponent;
