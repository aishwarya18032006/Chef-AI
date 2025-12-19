export default function ClaudeRecipe( { recipe } ) {
    return (
        <section>
          <h2>Chef Claude Recommends:</h2>
          <article
            className="suggested-recipe-container"
            aria-live="polite"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <p>{recipe}</p>
          </article>
        </section>
    )
}