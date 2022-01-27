const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar removeResult

  type Restaurants {
    id: ID!
    name: String!
    address: String!
    categoryId: ID!
  }

  extend type Mutation {
    newRestaurant(resName: String!, resAddress: String!, categoryId: ID!): Restaurants
    removeRestaurant(resId: ID!): removeResult
  }

  extend type Query {
    restaurants: [Restaurants!]
    restaurantsByCategory(categoryId: ID!): [Restaurants!]
  }
`;
