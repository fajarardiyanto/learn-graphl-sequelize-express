const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type User {
    id: Int!
    firstName: String!
    lastName: String
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getAllUsers: [User]
    getUser(id: Int!): User
  }

  extend type Mutation {
    login(email: String!, password: String!): String
    signUp(
      firstName: String!
      lastName: String
      email: String!
      password: String!
    ): User
    updateUser(
      id: Int!
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
`;
