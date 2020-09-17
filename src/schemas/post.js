const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    id: Int!
    title: String!
    slug: String!
    content: String!
    status: String!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getAllPosts: [Post]
    getPost(id: Int!): Post
  }

  extend type Mutation {
    addPost(title: String!, content: String!, status: String!): Post
    updatePost(id: Int!, title: String, content: String, status: String): Post
    deletePost(id: Int!): Boolean
  }
`;
