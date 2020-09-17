const { GraphQLDateTime } = require("graphql-iso-date");
const userResolvers = require("./user");

const customScalarResolverDate = {
  Date: GraphQLDateTime,
};

module.exports = [customScalarResolverDate, userResolvers];
