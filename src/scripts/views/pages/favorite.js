import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantListTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content" id="query">
      <h1 class="explore__label">Your Favorite Restaurants</h2>
      <div id="restaurants" class="restaurants">

      </div>
    </div>
      `;
  },

  async afterRender() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#maincontent');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      skipLink.blur();
    });
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    try {
      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<div class="restaurant-item_not_found">Tidak ada restaurant untuk ditampilkan</div>';
      }
      restaurants.forEach((resto) => {
        restaurantsContainer.innerHTML += createRestaurantListTemplate(resto);
      });
      // document.querySelector(".jumbotron").style.backgroundImage =
      //   "url('./images/heros/hero-image_2.jpg')";
      // eslint-disable-next-line no-empty
    } catch (err) {
      restaurantsContainer.innerHTML = `Error: ${err}`;
    }

    // restaurants.forEach((restaurant) => {
    //   restaurantsContainer.innerHTML +=
    //     createRestaurantListTemplate(restaurant);
    // });
  },
};

export default Favorite;
