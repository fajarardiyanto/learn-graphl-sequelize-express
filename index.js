const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const schema = require("./src/schemas/index");
const resolvers = require("./src/resolvers/index");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const authUser = await getUser(req);
    return {
      authUser,
    };
  },
});

const getUser = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError("Your session expired");
    }
  }
};

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () =>
  console.log(`🚀 Server started on http://localhost:${port}/graphql`)
);
