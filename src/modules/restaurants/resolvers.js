const {
  restaurants,
  newRestaurant,
  getRestaurantsByCategory,
  removeRestaurant,
} = require("./model");
const { verifyUser } = require("../../../lib/jwt");
const { login } = require("../auth/model");

module.exports = {
  Query: {
    restaurants: async () => {
      return await restaurants();
    },
    restaurantsByCategory: async (_, { categoryId }) => {
      return await getRestaurantsByCategory(categoryId);
    },
  },

  Mutation: {
    newRestaurant: async (_, { resName, resAddress, categoryId }, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          const createdRestaurant = await newRestaurant(resName, resAddress, categoryId);
          return createdRestaurant;
        }
      } catch (err) {
        console.log(err);
      }
    },
    removeRestaurant: async (_, { resId }, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          await removeRestaurant(resId);
          return { status: 200, message: "Deleted" };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  Restaurants: {
    id: global => global.res_id,
    name: global => global.res_name,
    address: global => global.res_address,
    categoryId: global => global.category_id,
  },
};
