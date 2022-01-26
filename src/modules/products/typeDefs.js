const { gql } = require("apollo-server-express");

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    cost: Int!
    img: String!
    restaurantId: ID!
  }

  extend type Query {
    products: [Product!]!
    byRestaurant: [Product!]!
  }
`;
