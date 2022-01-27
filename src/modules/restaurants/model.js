const { fetch, fetchAll } = require("../../../lib/postgres");

const RESTAURANTS = `
     SELECT
          *
     FROM
          restaurants
`;

const BY_CATEGORY = `
     SELECT
          *
     FROM
          restaurants
     WHERE
          category_id = $1
`;

const NEW_RESTAURANT = `
     INSERT INTO 
          restaurants(res_name, res_address, category_id) 
          VALUES($1, $2, $3)
     RETURNING *
`;

const REMOVE_RESTAURANT = `
     DELETE FROM
          restaurants
     WHERE 
          res_id = $1
`;

const restaurants = () => fetchAll(RESTAURANTS);
const getRestaurantsByCategory = categoryId => fetchAll(BY_CATEGORY, categoryId);
const newRestaurant = (resName, resAddress, categoryId) =>
  fetch(NEW_RESTAURANT, resName, resAddress, categoryId);
const removeRestaurant = resId => fetch(REMOVE_RESTAURANT, resId);

module.exports = {
  restaurants,
  getRestaurantsByCategory,
  newRestaurant,
  removeRestaurant,
};
