/**
 * Recipe matching logic - extracted from RecipeFinder and StockpileManager for TDD
 * Handles: ingredient-based recipe search, food/drink/both/ready classification
 */

/**
 * Check if a recipe's food OR drink section matches the selected ingredients
 * (RecipeFinder logic: ALL selected ingredients must be present)
 * @param {object} recipe - recipe object with ingredients, drink, preliminary_steps
 * @param {string[]} selectedIngredients - normalized (lowercase) ingredient strings
 * @param {function} isIngredientMatch - (a, b) => bool
 * @param {function} parseIngredient - (raw) => string
 * @returns {'food'|'drink'|'both'|null} match type or null
 */
export function matchRecipeByIngredients(recipe, selectedIngredients, isIngredientMatch, parseIngredient) {
  if (!selectedIngredients || selectedIngredients.length === 0) return null;

  const collectIngs = (baseIngs, prelimSteps) => {
    let list = baseIngs ? baseIngs.map(i => parseIngredient(i).toLowerCase()) : [];
    if (prelimSteps) {
      prelimSteps.forEach(step => {
        if (step.ingredients) {
          list = list.concat(step.ingredients.map(i => parseIngredient(i).toLowerCase()));
        }
      });
    }
    return list;
  };

  const foodIngs = collectIngs(recipe.ingredients, recipe.preliminary_steps);
  const drinkIngs = recipe.drink
    ? collectIngs(recipe.drink.ingredients, recipe.drink.preliminary_steps)
    : [];

  const hasFood = selectedIngredients.every(sel =>
    foodIngs.some(rIng => isIngredientMatch(rIng, sel))
  );
  const hasDrink = drinkIngs.length > 0 && selectedIngredients.every(sel =>
    drinkIngs.some(rIng => isIngredientMatch(rIng, sel))
  );

  if (hasFood || hasDrink) {
    if (hasFood && hasDrink) return 'both';
    if (hasDrink) return 'drink';
    return 'food';
  }
  return null;
}

/**
 * Get missing ingredients for a recipe (used by RecipeCard "Add Missing to Cart")
 * @param {object} recipe - recipe with ingredients, preliminary_steps
 * @param {string[]} ownedList - normalized list of owned ingredients
 * @param {function} parseIngredient
 * @param {function} isStaple
 * @param {function} isIngredientMatch
 * @returns {string[]} missing ingredient names (parsed format)
 */
export function getMissingIngredients(recipe, ownedList, parseIngredient, isStaple, isIngredientMatch) {
  const missing = [];
  const uniqueOwned = [...new Set(ownedList.map(i => i.toLowerCase()))];

  const checkAndAdd = (ingredients) => {
    if (!ingredients) return;
    ingredients.forEach(ing => {
      const parsed = parseIngredient(ing).toLowerCase();
      if (!parsed || isStaple(parsed)) return;

      const options = parsed.split(/\s+or\s+/i).map(s => s.trim());
      const hasRequirement = options.some(opt =>
        isStaple(opt) || uniqueOwned.some(owned => isIngredientMatch(opt, owned))
      );

      if (!hasRequirement) {
        missing.push(parseIngredient(options[0]));
      }
    });
  };

  if (recipe.ingredients) checkAndAdd(recipe.ingredients);
  if (recipe.preliminary_steps) {
    recipe.preliminary_steps.forEach(step => {
      if (step.ingredients) checkAndAdd(step.ingredients);
    });
  }

  return missing;
}
