const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    password: String!
  }

  extend type Mutation {
    register(name: String!, password: String!): String
    login(name: String!, password: String!): String
  }
`;
