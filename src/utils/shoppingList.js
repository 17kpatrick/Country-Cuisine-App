/**
 * Shopping list utilities - pure functions for adding/removing items
 * Extracted for testability (TDD)
 */

/**
 * Add items to shopping list, avoiding duplicates
 * @param {string[]} currentList - current shopping list
 * @param {string[]} newItems - items to add
 * @returns {string[]} new list with items added (no duplicates)
 */
export function addToShoppingList(currentList, newItems) {
  const newItemsFiltered = newItems.filter(item => !currentList.includes(item));
  if (newItemsFiltered.length === 0) return currentList;
  return [...currentList, ...newItemsFiltered];
}

/**
 * Remove one item from shopping list (all occurrences)
 * @param {string[]} currentList - current shopping list
 * @param {string} item - item to remove
 * @returns {string[]} new list with item removed
 */
export function removeFromShoppingList(currentList, item) {
  return currentList.filter(i => i !== item);
}

/**
 * Clear the shopping list
 * @returns {string[]} empty list
 */
export function clearShoppingList() {
  return [];
}
