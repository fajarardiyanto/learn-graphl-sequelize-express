const { GraphQLDateTime } = require("graphql-iso-date");
const userResolvers = require("./user");
const postResolvers = require("./post");

const customScalarResolverDate = {
  Date: GraphQLDateTime,
};

module.exports = [customScalarResolverDate, userResolvers, postResolvers];
