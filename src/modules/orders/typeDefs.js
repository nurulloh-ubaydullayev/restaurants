const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Data

  type Orders {
    id: ID!
    city: String!
    district: String!
    address: String!
    owner: String!
    tel: String!
    status: Boolean!
    time: String!
    user: ID!
  }

  type orderProduct {
    id: ID!
    count: Int!
    productId: ID!
    name: String!
    cost: Int!
    image: String!
    restaurantId: ID!
  }

  extend type Query {
    orders: [Orders!]
    orderProducts(orderId: ID!): [orderProduct]
  }

  extend type Mutation {
    newOrder(
      city: String!
      district: String!
      address: String!
      owner: String!
      tel: String!
      productsList: [Data]
    ): String!
  }
`;
