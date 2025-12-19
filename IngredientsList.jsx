export default function IngredientsList( { ingredientsListItems, ingredients, handleGetRecipe, loading } ) {
    return (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>

          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={handleGetRecipe} disabled={loading}>
                {loading ? "Generating..." : "Get a recipe"}
              </button>
            </div>
          )}
        </section>
    )
}