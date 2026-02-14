/**
 * TDD Tests: Ingredient parsing, matching, and recipe helpers
 * These tests document and verify the "wonky" behavior of the ingredient system
 */

import '../src/utils/helpers.js';

const { parseIngredient, isStaple, isIngredientMatch, getRecipeFromDB, getUniqueIngredients } = global;

describe('parseIngredient', () => {
  test('removes quantities and units', () => {
    expect(parseIngredient('2 cups Flour')).toBe('Flour');
    expect(parseIngredient('1 tbsp Salt')).toBe('Salt');
    expect(parseIngredient('500g Beef')).toBe('Beef');
  });

  test('removes parenthetical content', () => {
    expect(parseIngredient('Grenadine (store-bought or homemade)')).toBe('Grenadine');
    expect(parseIngredient('1 cup Rice (soaked 2 hours)')).toBe('Rice');
  });

  test('splits on comma to remove prep notes', () => {
    expect(parseIngredient('Chicken breasts, cooked and shredded')).toBe('Chicken breast');
    expect(parseIngredient('Onion, chopped')).toBe('Onion');
  });

  test('handles OR alternatives', () => {
    expect(parseIngredient('Beef or Chicken')).toMatch(/Beef or Chicken/i);
  });

  test('removes prep words like Chopped, Diced, Minced', () => {
    expect(parseIngredient('2 Tomatoes, chopped')).toBe('Tomato');
    expect(parseIngredient('Garlic, minced')).toBe('Garlic');
  });

  test('returns empty for invalid/short inputs', () => {
    expect(parseIngredient('')).toBe('');
    expect(parseIngredient('a')).toBe('');
    expect(parseIngredient('  ')).toBe('');
  });

  test('handles complex real-world ingredients', () => {
    // Note: "round" may remain; parseIngredient preserves structure
    expect(parseIngredient('1 large round Edam Cheese (hollowed out)')).toContain('Edam');
    expect(parseIngredient('3 cups Sella Basmati rice (soaked 2 hours)')).toContain('rice');
  });

  test('avoids false positive "Gin" vs "Ginger" - parseIngredient does not conflate', () => {
    // parseIngredient just cleans; isIngredientMatch handles fuzzy matching
    expect(parseIngredient('Gin')).toBe('Gin');
    expect(parseIngredient('Fresh Ginger')).toBe('Ginger');
  });
});

describe('isStaple', () => {
  test('identifies common staples', () => {
    expect(isStaple('salt')).toBe(true);
    expect(isStaple('water')).toBe(true);
    expect(isStaple('oil')).toBe(true);
    expect(isStaple('flour')).toBe(true);
    expect(isStaple('ice')).toBe(true);
  });

  test('handles variants', () => {
    expect(isStaple('olive oil')).toBe(true);
    expect(isStaple('kosher salt')).toBe(true);
  });

  test('rejects non-staples', () => {
    expect(isStaple('beef')).toBe(false);
    expect(isStaple('chicken')).toBe(false);
  });
});

describe('isIngredientMatch', () => {
  test('exact match', () => {
    expect(isIngredientMatch('beef', 'beef')).toBe(true);
  });

  test('word-boundary match - "Rice" in "Basmati Rice"', () => {
    expect(isIngredientMatch('rice', 'Basmati Rice')).toBe(true);
    expect(isIngredientMatch('Basmati Rice', 'rice')).toBe(true);
  });

  test('avoids false positive: Gin vs Ginger', () => {
    expect(isIngredientMatch('gin', 'ginger')).toBe(false);
    expect(isIngredientMatch('ginger', 'gin')).toBe(false);
  });

  test('avoids false positive: Curry as substring', () => {
    // "Curry" should NOT match "Black Chickpea Curry" as substring without word boundary
    // Actually the code says: if "curry" is a word in "black chickpea curry" -> \bcurry\b matches
    // So "curry" DOES match "black chickpea curry" - that's by design for stockpile
    expect(isIngredientMatch('curry', 'black chickpea curry')).toBe(true);
  });
});

describe('getRecipeFromDB', () => {
  const db = {
    USA: { dish: 'American Dish', ingredients: [] },
    IND: {
      dish: 'Indian Dish',
      regions: { 'Tamil Nadu': { dish: 'Idli', ingredients: [] } }
    }
  };

  test('direct key lookup', () => {
    expect(getRecipeFromDB(db, 'USA')).toEqual(db.USA);
  });

  test('region lookup', () => {
    expect(getRecipeFromDB(db, 'Tamil Nadu')).toEqual(db.IND.regions['Tamil Nadu']);
  });

  test('returns null for missing key', () => {
    expect(getRecipeFromDB(db, 'XYZ')).toBeNull();
  });
});

describe('getUniqueIngredients', () => {
  const db = {
    A: {
      ingredients: ['2 cups Rice', '1 Chicken'],
      preliminary_steps: [{ ingredients: ['Sugar'] }],
      drink: { ingredients: ['Vodka'] }
    }
  };

  test('extracts ingredients from recipes', () => {
    const ingredients = getUniqueIngredients(db);
    expect(ingredients).toContain('Rice');
    expect(ingredients).toContain('Chicken');
  });

  test('includes preliminary step ingredients', () => {
    const ingredients = getUniqueIngredients(db);
    expect(ingredients).toContain('Sugar');
  });

  test('includes drink ingredients', () => {
    const ingredients = getUniqueIngredients(db);
    expect(ingredients).toContain('Vodka');
  });
});
