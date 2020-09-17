const DB = require("../../models");
const slugify = require("slugify");
const { ApolloError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getAllPosts() {
      return await DB.Post.findAll({});
    },

    async getPost(_, { id }) {
      return await DB.Post.findById(id);
    },
  },

  Mutation: {
    async addPost(_, { title, content, status }, { authUser }) {
      try {
        const post = await DB.Post.create({
          title,
          slug: slugify(title, { lower: true }),
          content,
          status,
          userId: authUser.id,
        });

        console.log(post);

        return post;
      } catch (err) {
        console.log(err);
        throw new ApolloError(err);
      }
    },

    async updatePost(_, { id, title, content, status }, { authUser }) {
      if (!authUser) {
        throw new Error("You must login to continue");
      }

      const post = await DB.Post.findByPk(id);

      await post.update({
        title,
        slug: slugify(title, { lower: true }),
        content,
        status,
      });

      return post;
    },

    async deletePost(_, { id }, { authUser }) {
      if (!authUser) {
        throw new Error("You must be login to continue");
      }

      const post = await DB.Post.findByPk(id);

      return await post.destroy();
    },
  },
};
