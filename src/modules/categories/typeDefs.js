const { gql } = require("apollo-server-express");

module.exports = gql`
  type Categories {
    id: ID!
    name: String!
  }

  extend type Query {
    categories: [Categories!]
  }
`;
