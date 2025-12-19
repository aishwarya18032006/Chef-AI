import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleGetRecipe() {
    setLoading(true);
    setRecipe("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/recipe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }),
        }
      );

      const data = await response.json();

      if (data.recipe) {
        setRecipe(data.recipe);
      } else {
        setRecipe("Couldn't generate a recipe. Try again later.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Error fetching recipe. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient) {
      setIngredients((prev) => [...prev, newIngredient]);
    }
  }

  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredientsListItems={ingredientsListItems}
          ingredients={ingredients}
          handleGetRecipe={handleGetRecipe}
          loading={loading}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
