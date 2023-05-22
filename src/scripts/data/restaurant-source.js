import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async exploreRestaurants() {
    console.log(API_ENDPOINT.EXPLORE_RESTAURANTS);
    const response = await fetch(API_ENDPOINT.EXPLORE_RESTAURANTS);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    // console.log(API_ENDPOINT.DETAIL(id));
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseData = await response.json();
    return responseData.restaurant;
    // }

    // static async postRestaurantReview(data) {
    //   try {
    //     const options = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     };
    //     const responseText = await fetch(API_ENDPOINT.POST_REVIEW, options);
    //     return responseText.json();
    //   } catch (error) {
    // eslint-disable-next-line max-len
    //     return { error: true, message: `${error.message}! Review not successfully added!\nPlease check your internet connection!` };
    //   }
  }
}

export default RestaurantSource;
