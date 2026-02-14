/**
 * Vitest setup: provide browser globals so helpers.js can run in Node
 */
global.window = global;
global.document = { createElement: () => ({}), createEvent: () => ({}) };
