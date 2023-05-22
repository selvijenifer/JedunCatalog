/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.waitForElement('#query');
  I.seeElement('#query');
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item_not_found',
  );
});

Scenario('liking one restaurants', async ({ I }) => {
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item_not_found',
  );
  I.amOnPage('/');
  I.wait(1);
  I.seeElement('.restaurant-item');
  const firstResto = locate('.restaurant-item a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.wait(1);
  I.click(firstResto);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.wait(1);

  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestoTitle = await I.grabTextFrom('.resto__title');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario(' unlike restaurant', async ({ I }) => {
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item_not_found',
  );
  I.amOnPage('/');
  I.wait(1);
  I.waitForElement('.restaurant-item a', 10);
  const firstResto = locate('.restaurant-item a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item a');

  const likedRestoTitle = await I.grabTextFrom('.resto__title');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
  I.wait(1);

  I.click(likedRestoTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item_not_found');
  const unlikedRestaurant = await I.grabTextFrom('.restaurant-item_not_found');
  assert.strictEqual(unlikedRestaurant, 'Tidak ada restaurant untuk ditampilkan');
});
