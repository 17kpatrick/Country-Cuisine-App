/**
 * TDD Tests: Recipe matching logic (RecipeFinder, RecipeCard "Add Missing")
 */

import '../src/utils/helpers.js';
import { matchRecipeByIngredients, getMissingIngredients } from '../src/utils/recipeMatching.js';

const { parseIngredient, isStaple, isIngredientMatch } = global;

describe('matchRecipeByIngredients (RecipeFinder logic)', () => {
  test('returns null when no ingredients selected', () => {
    const recipe = { ingredients: ['Beef', 'Onion'], preliminary_steps: [] };
    expect(matchRecipeByIngredients(recipe, [], isIngredientMatch, parseIngredient)).toBeNull();
  });

  test('matches food when ALL selected ingredients are in recipe', () => {
    const recipe = {
      ingredients: ['2 lbs Beef', '1 Onion', '2 Tomatoes'],
      preliminary_steps: []
    };
    expect(matchRecipeByIngredients(recipe, ['beef', 'onion'], isIngredientMatch, parseIngredient)).toBe('food');
  });

  test('does NOT match when any selected ingredient is missing', () => {
    const recipe = {
      ingredients: ['2 lbs Beef', '1 Onion'],
      preliminary_steps: []
    };
    expect(matchRecipeByIngredients(recipe, ['beef', 'chicken'], isIngredientMatch, parseIngredient)).toBeNull();
  });

  test('matches drink when ingredients are in drink section', () => {
    const recipe = {
      ingredients: ['Chicken'],
      drink: {
        ingredients: ['Vodka', 'Orange juice', 'Ice'],
        preliminary_steps: []
      }
    };
    expect(matchRecipeByIngredients(recipe, ['vodka', 'orange juice'], isIngredientMatch, parseIngredient)).toBe('drink');
  });

  test('matches "both" when selected ingredients appear in BOTH food and drink', () => {
    // Both sections must contain all selected ingredients (e.g. Sugar in both)
    const recipe = {
      ingredients: ['Beef', 'Sugar'],
      drink: { ingredients: ['Vodka', 'Sugar'], preliminary_steps: [] }
    };
    const result = matchRecipeByIngredients(recipe, ['sugar'], isIngredientMatch, parseIngredient);
    expect(result).toBe('both');
  });

  test('includes preliminary_steps ingredients in match', () => {
    const recipe = {
      ingredients: ['2 cups Cooked Semolina Porridge'],
      preliminary_steps: [
        { item: 'Semolina Porridge', ingredients: ['1 cup Semolina', '2 cups Water'] }
      ]
    };
    // Selected: semolina, water - both in prelim
    expect(matchRecipeByIngredients(recipe, ['semolina', 'water'], isIngredientMatch, parseIngredient)).toBe('food');
  });
});

describe('getMissingIngredients (RecipeCard Add Missing to Cart)', () => {
  test('returns empty when all non-staple ingredients are owned', () => {
    const recipe = { ingredients: ['2 cups Rice', '1 Chicken', 'Salt'] };
    const owned = ['rice', 'chicken'];
    expect(getMissingIngredients(recipe, owned, parseIngredient, isStaple, isIngredientMatch)).toEqual([]);
  });

  test('returns missing non-staple ingredients', () => {
    const recipe = { ingredients: ['2 cups Rice', '1 Chicken', '1 Onion'] };
    const owned = ['rice'];
    const missing = getMissingIngredients(recipe, owned, parseIngredient, isStaple, isIngredientMatch);
    // parseIngredient returns title case for display
    expect(missing.some(m => m.toLowerCase() === 'chicken')).toBe(true);
    expect(missing.some(m => m.toLowerCase() === 'onion')).toBe(true);
  });

  test('does NOT include staples in missing list', () => {
    const recipe = { ingredients: ['Salt', 'Pepper', '1 Chicken'] };
    const owned = [];
    const missing = getMissingIngredients(recipe, owned, parseIngredient, isStaple, isIngredientMatch);
    expect(missing.some(m => m.toLowerCase() === 'salt')).toBe(false);
    expect(missing.some(m => m.toLowerCase() === 'pepper')).toBe(false);
    expect(missing.some(m => m.toLowerCase() === 'chicken')).toBe(true);
  });

  test('handles OR - having any option satisfies', () => {
    const recipe = { ingredients: ['Beef or Chicken', 'Onion'] };
    const owned = ['chicken'];
    const missing = getMissingIngredients(recipe, owned, parseIngredient, isStaple, isIngredientMatch);
    expect(missing.some(m => m.toLowerCase() === 'chicken')).toBe(false);
    expect(missing.some(m => m.toLowerCase() === 'beef')).toBe(false);
  });

  test('includes ingredients from preliminary_steps', () => {
    const recipe = {
      ingredients: ['2 cups Cooked Curry'],
      preliminary_steps: [
        { item: 'Curry', ingredients: ['Curry paste', 'Coconut milk'] }
      ]
    };
    const owned = [];
    const missing = getMissingIngredients(recipe, owned, parseIngredient, isStaple, isIngredientMatch);
    expect(missing.length).toBeGreaterThan(0);
  });
});
