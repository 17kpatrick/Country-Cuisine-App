#!/usr/bin/env node
/**
 * Selenium E2E test runner
 * Run with npm run test:e2e (headless) or npm run test:e2e:headed (watch the browser)
 *
 * Prerequisite: Start the app server first!
 *   npx serve . -p 8080
 *   Then: npm run test:e2e:headed
 *
 * Uses data-testid attributes in the app for stable selectors.
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/src/';

async function runTests(headed = false) {
  const { Builder, By, until } = await import('selenium-webdriver');
  const chrome = await import('selenium-webdriver/chrome.js');
  const Options = chrome.default?.Options ?? chrome.Options;

  const byTestId = (id) => By.css(`[data-testid="${id}"]`);

  const options = new Options();
  if (!headed) {
    options.addArguments('--headless=new');
  }
  options.addArguments('--window-size=1280,900');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const WAIT = {
    pageLoad: 15000,
    appReady: 25000,
    interaction: 10000,
    suggestions: 8000,
    results: 8000,
  };

  const locators = {
    recipeFinderPanel: byTestId('recipe-finder-panel'),
    recipeFinderToggle: byTestId('recipe-finder-toggle'),
    recipeFinderSearch: byTestId('recipe-finder-search'),
    recipeFinderSuggestion: byTestId('recipe-finder-suggestion'),
    recipeFinderNoResults: byTestId('recipe-finder-no-results'),
    recipeResult: byTestId('recipe-result'),
    shoppingCartBtn: byTestId('shopping-cart-btn'),
    mapHint: byTestId('map-hint'),
  };

  try {
    console.log(`\n🌍 Selenium E2E Tests (${headed ? 'HEADED - watch the browser!' : 'headless'})\n`);
    console.log(`App URL: ${BASE_URL}\n`);

    // 1. Load app and wait for map
    console.log('  ✓ Loading app...');
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.id('map')), WAIT.pageLoad);

    // 2. Wait for app ready: Recipe Finder (panel or toggle) is present (loader gone, React mounted)
    console.log('  ✓ Waiting for app ready...');
    await driver.wait(async () => {
      const panel = await driver.findElements(locators.recipeFinderPanel);
      const toggle = await driver.findElements(locators.recipeFinderToggle);
      return panel.length > 0 || toggle.length > 0;
    }, WAIT.appReady);
    await driver.sleep(500); // allow any final paint

    // 3. Ensure Recipe Finder is open and get search input
    console.log('  ✓ Opening Recipe Finder...');
    const panel = await driver.findElements(locators.recipeFinderPanel);
    if (panel.length === 0) {
      const toggle = await driver.wait(until.elementLocated(locators.recipeFinderToggle), WAIT.interaction);
      await toggle.click();
      await driver.sleep(400);
    }
    const searchInput = await driver.wait(until.elementLocated(locators.recipeFinderSearch), WAIT.interaction);

    // 3b. Verify map hint is visible (before we select a recipe, which hides it)
    const hint = await driver.wait(until.elementLocated(locators.mapHint), WAIT.interaction);
    const hintText = await hint.getText();
    if (!hintText || !hintText.includes('recipe')) {
      throw new Error(`Expected map hint to contain "recipe", got: ${hintText ? hintText.substring(0, 60) : 'empty'}`);
    }
    console.log('     Map hint OK: ' + hintText.substring(0, 50) + '...');

    // 4. Type ingredient and wait for suggestions
    console.log('  ✓ Typing ingredient "Beef"...');
    await searchInput.clear();
    await searchInput.sendKeys('Beef');
    const suggestion = await driver.wait(
      until.elementLocated(locators.recipeFinderSuggestion),
      WAIT.suggestions
    );
    await suggestion.click();
    await driver.sleep(400);

    // 5. Wait for results to settle (no-results message or at least one recipe result), then optionally click first result
    console.log('  ✓ Waiting for recipe results...');
    await driver.wait(async () => {
      const noResults = await driver.findElements(locators.recipeFinderNoResults);
      const results = await driver.findElements(locators.recipeResult);
      return noResults.length > 0 || results.length > 0;
    }, WAIT.results);
    const recipeResults = await driver.findElements(locators.recipeResult);
    if (recipeResults.length > 0) {
      await recipeResults[0].click();
      await driver.sleep(800);
    } else {
      console.log('     (No recipes matched Beef; skipping recipe click)');
    }

    // 6. Open shopping cart
    console.log('  ✓ Opening shopping cart...');
    const cartBtn = await driver.wait(until.elementLocated(locators.shoppingCartBtn), WAIT.interaction);
    await cartBtn.click();
    await driver.sleep(400);

    // 7. Final sanity: cart button still present
    console.log('  ✓ Verifying UI elements...');
    await driver.wait(until.elementLocated(locators.shoppingCartBtn), WAIT.interaction);

    if (headed) {
      console.log('\n  👀 Pausing 3 seconds so you can see the result...\n');
      await driver.sleep(3000);
    }

    console.log('\n✅ All Selenium E2E steps passed!\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ E2E Test failed:', err.message);
    if (headed) {
      console.log('   Browser will close in 5 seconds...');
      await driver.sleep(5000);
    }
    process.exit(1);
  } finally {
    await driver.quit();
  }
}

const headed = process.argv.includes('--headed');
runTests(headed);
