const { fetch, fetchAll } = require("../../../lib/postgres");

const PRODUCTS = `
     SELECT
          *
     FROM 
          products
`;

const BY_RESTAURANTS = `
     SELECT
          *
     FROM
          products
     WHERE
          restaurant_id = $1
`;

const products = () => fetchAll(PRODUCTS);
const getProductsByRestaurants = restaurantId => fetchAll(BY_RESTAURANTS, restaurantId);

module.exports = { products, getProductsByRestaurants };
