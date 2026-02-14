# World Recipe Map

Explore recipes from around the world on an interactive map. Click countries to discover traditional dishes and drinks, search recipes by ingredients, manage your pantry (stockpile), and build shopping lists.

## Features

- **Interactive Map** – Click countries and regions (USA, India, China, Brazil) to drill down
- **Recipe Finder** – Search by ingredients to find matching recipes
- **My Stockpile** – Add ingredients you own to see what you can make
- **Shopping List** – Add missing ingredients to a cart, persisted in `localStorage`

## Running the App

Open `src/index.html` in a browser (a local server is recommended to avoid CORS):

```bash
# Using Python
python -m http.server 8080
# Open http://localhost:8080/src/

# Or use npx serve
npx serve .
# Open http://localhost:8080/src/
```

## Testing (TDD)

Tests use [Vitest](https://vitest.dev) and cover recipes, shopping list, and the “wonky” ingredient logic.

### Run tests

```bash
npm install
npm test
```

### Watch mode (re-run on changes)

```bash
npm run test:watch
```

### Test coverage

```bash
npm run test:coverage
```

## Test Structure

| File | What it covers |
|------|----------------|
| `tests/helpers.test.js` | `parseIngredient`, `isStaple`, `isIngredientMatch`, `getRecipeFromDB`, `getUniqueIngredients` |
| `tests/shoppingList.test.js` | Add, remove, clear shopping list; duplicate filtering |
| `tests/recipeMatching.test.js` | Recipe Finder matching (food/drink/both), RecipeCard “Add Missing to Cart” |

## How Key Behaviors Work (The “Wonky” Parts)

### Ingredient parsing (`parseIngredient`)

- Removes quantities (`2 cups`, `500g`) and units
- Splits on comma to drop prep notes (`Onion, chopped` → `Onion`)
- Removes parentheticals (`(optional)`), many prep words (chopped, minced, etc.)
- Handles OR: `Beef or Chicken` stays as alternatives
- Case: output keeps title-style casing (e.g. `Flour` not `flour`)

### Ingredient matching (`isIngredientMatch`)

- Exact match: `beef` ↔ `beef`
- Word-boundary match: `rice` in `Basmati Rice`
- Avoids false positives: `gin` does **not** match `ginger`

### Shopping list

- **Duplicates**: Only adds items not already in the list
- **Case**: `Beef` and `beef` are different items
- **Storage**: List is saved in `localStorage` as `shoppingList`

### Recipe matching (Recipe Finder)

- ALL selected ingredients must appear in the recipe (food or drink)
- Classification: `food`, `drink`, or `both` (when all selected ingredients appear in both sections)
- Preliminary steps (e.g. making curry paste) are included in matching

### “Add Missing to Cart” (RecipeCard)

- Compares owned vs recipe ingredients (including `preliminary_steps`)
- Staples (salt, water, oil, etc.) are not added to the cart
- OR logic: for `Beef or Chicken`, owning either is enough
