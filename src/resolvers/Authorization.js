const { ForbiddenError } = require("apollo-server");
const { skip, combineResolvers } = require("graphql-resolvers");

module.export = isAuthenticated = (parent, args, { me }) => {
  if (me) {
    return skip;
  }

  return new ForbiddenError("User is not Authenticated");
};

module.exports = isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => {
    return role === "admin" ? skip : new ForbiddenError("User is not Admin");
  }
);
