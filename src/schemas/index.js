const { gql } = require("apollo-server-express");

const userSchema = require("./user");
const postSchema = require("./post");

const baseSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [baseSchema, userSchema, postSchema];
