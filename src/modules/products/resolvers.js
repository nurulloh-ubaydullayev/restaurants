const { products, getProductsByRestaurants } = require("./model");

module.exports = {
  Query: {
    products: async () => {
      return await products();
    },
    byRestaurant: async (_, { restaurantId }) => {
      return await getProductsByRestaurants(restaurantId);
    },
  },
  Product: {
    id: global => global.product_id,
    name: global => global.product_name,
    cost: global => global.product_cost,
    img: global => global.product_img,
    restaurantId: global => global.restaurant_id,
  },
};
