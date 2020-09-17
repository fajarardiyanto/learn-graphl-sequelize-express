const DB = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { ApolloError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getAllUsers() {
      return await DB.User.findAll({});
    },

    async getUser(_, { id }, { authUser }) {
      return await DB.User.findByPk(id);
    },
  },

  Mutation: {
    async login(_, { email, password }) {
      const user = await DB.User.findOne({ where: { email } });
      if (!user) {
        throw new UserInputError("No User Found with this User!");
      }

      const valid = await bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new UserInputError("Invalid Password Provided");
      }

      return jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    },

    async signUp(_, { firstName, lastName, email, password }) {
      const existUserEmail = await DB.User.findOne({
        where: { email },
      });
      if (existUserEmail) {
        throw new UserInputError("Email Already Exist");
      }

      return await DB.User.create({
        firstName,
        lastName,
        role: "user",
        email,
        password: await bcrypt.hashSync(password, 10),
      });
    },

    async updateUser(
      _,
      { id, firstName, lastName, email, password },
      { authUser }
    ) {
      if (!authUser) {
        throw new Error("You must be login first");
      }

      try {
        const user = await DB.User.findByPk(id);
        if (!user) {
          throw new Error("No User found for update, plese check");
        }

        await user.update({
          firstName,
          lastName,
          email,
          password,
        });

        return user;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
};
