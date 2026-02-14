/**
 * TDD Tests: Shopping list add/remove/clear logic
 * Documents the "wonky" behavior: duplicate filtering, case sensitivity, etc.
 */

import { addToShoppingList, removeFromShoppingList, clearShoppingList } from '../src/utils/shoppingList.js';

describe('addToShoppingList', () => {
  test('adds new items to empty list', () => {
    expect(addToShoppingList([], ['Beef', 'Onion'])).toEqual(['Beef', 'Onion']);
  });

  test('adds new items to existing list', () => {
    expect(addToShoppingList(['Rice'], ['Beef', 'Onion'])).toEqual(['Rice', 'Beef', 'Onion']);
  });

  test('does NOT add duplicates - exact match', () => {
    expect(addToShoppingList(['Rice', 'Beef'], ['Beef', 'Onion'])).toEqual(['Rice', 'Beef', 'Onion']);
  });

  test('returns same list when all new items already exist', () => {
    const list = ['Rice', 'Beef'];
    const result = addToShoppingList(list, ['Rice', 'Beef']);
    expect(result).toBe(list); // same reference - no new array needed
  });

  test('is case-sensitive - "Beef" vs "beef" are different', () => {
    expect(addToShoppingList(['Beef'], ['beef'])).toEqual(['Beef', 'beef']);
  });
});

describe('removeFromShoppingList', () => {
  test('removes single item', () => {
    expect(removeFromShoppingList(['Rice', 'Beef', 'Onion'], 'Beef')).toEqual(['Rice', 'Onion']);
  });

  test('removes all occurrences of item', () => {
    expect(removeFromShoppingList(['Rice', 'Beef', 'Beef', 'Onion'], 'Beef')).toEqual(['Rice', 'Onion']);
  });

  test('returns same list when item not found', () => {
    const list = ['Rice', 'Beef'];
    expect(removeFromShoppingList(list, 'Chicken')).toEqual(['Rice', 'Beef']);
  });

  test('handles empty list', () => {
    expect(removeFromShoppingList([], 'Beef')).toEqual([]);
  });
});

describe('clearShoppingList', () => {
  test('returns empty array', () => {
    expect(clearShoppingList()).toEqual([]);
  });
});
